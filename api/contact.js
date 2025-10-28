//api/contact.js (Vercel Serverless Function, Node.js)
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ type: "error", message: "Method Not Allowed" });
    }
    const { name = "", email = "" } = req.body || {};
    if (!name.trim() || !email.trim() || !message.trim()) {
        return res.status(400).json({ type: "error", message: "All fields are requires." });
    }
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        //FROM must be the SAME mailbox you authenticate with, or Porkbun will reject it
        const fromAddr = process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME;

        await transporter.sendMail({
            from: `"Swift Designs" ,${fromAddr}.`,
            to: process.env.MAIL_TO_ADDRESS,
            subject: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            replyTo: `${name} ,${email}.`,
        });

        return res.status(200).json({ type: "success", message: "Message sent successfully. Thank you - I will reply soon." })
    } catch (err) {
        return res.status(500).json({ type: "error", message: `Mailer error: ${err.message}` });
    }
};