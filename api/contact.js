// api/contact.js
const { getDb } = require("../lib/mongo");
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ type: "error", message: "Method not allowed" });
    }

    const { name = "", email = "", message = "" } = req.body || {};
    const clean = (s) => (s || "").toString().trim();

    const doc = {
        name: clean(name),
        email: clean(email),
        message: clean(message),
        ua: req.headers["user-agent"] || "",
        ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "",
        createdAt: new Date(),
        status: "pending", // we’ll flip to “sent” if email succeeds
    };

    if (!doc.name || !doc.email || !doc.message || !doc.email.includes("@")) {
        return res.status(400).json({ type: "error", message: "All fields are required (valid email)." });
    }

    try {
        // 1) Save submission
        const db = await getDb();
        const { insertedId } = await db.collection("contact_submissions").insertOne(doc);

        // 2) Send email via Porkbun
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,              // smtp.porkbun.com
            port: Number(process.env.MAIL_PORT || 587),
            secure: false,                            // STARTTLS on 587
            auth: {
                user: process.env.MAIL_USERNAME,        // MUST be a real Porkbun mailbox
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const fromAddr = process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME;

        await transporter.sendMail({
            from: `"Swift Designs" <${fromAddr}>`,
            to: process.env.MAIL_TO_ADDRESS,
            subject: process.env.MAIL_SUBJECT || "New Contact Form Message",
            text: `Name: ${doc.name}\nEmail: ${doc.email}\n\nMessage:\n${doc.message}\n\nSubmission ID: ${insertedId}`,
            replyTo: `${doc.name} <${doc.email}>`,
        });

        // 3) Mark as sent
        await db.collection("contact_submissions").updateOne(
            { _id: insertedId },
            { $set: { status: "sent", sentAt: new Date() } }
        );

        return res.status(200).json({ type: "success", message: "Message sent successfully. Thank you — I will reply soon." });
    } catch (err) {
        // Best-effort log the failure
        try {
            const db = await getDb();
            await db.collection("contact_submissions_errors").insertOne({
                error: err.message || String(err),
                payload: { name, email, message },
                createdAt: new Date(),
            });
        } catch { }

        return res.status(500).json({ type: "error", message: `Mailer/DB error: ${err.message}` });
    }
};
