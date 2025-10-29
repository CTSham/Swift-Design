// api/contact.js

import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

let cachedClient = global._swiftMongoClient || null;

async function getDb() {
    if (!cachedClient) {
        cachedClient = new MongoClient(process.env.MONGODB_URI, {
            // keep-alive for serverless
            maxIdleTimeMS: 30_000,
        });
        await cachedClient.connect();
        global._swiftMongoClient = cachedClient;
    }
    return cachedClient.db(process.env.MONGODB_DB || "swift");
}

function json(res, status, data) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
}

function sanitize(s) {
    return String(s || "").trim();
}

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== "POST") {
        return json(res, 405, { type: "error", message: "Method not allowed" });
    }

    try {
        // Parse body (supports form-encoded or JSON)
        const contentType = req.headers["content-type"] || "";
        let body = {};
        if (contentType.includes("application/json")) {
            body = req.body || {};
        } else {
            // form-encoded
            const buffers = [];
            for await (const chunk of req) buffers.push(chunk);
            const raw = Buffer.concat(buffers).toString("utf8");
            body = Object.fromEntries(new URLSearchParams(raw));
        }

        const name = sanitize(body.name);
        const email = sanitize(body.email);
        const message = sanitize(body.message);
        const honeypot = sanitize(body.website); // hidden field (should be empty)

        // Basic validation
        if (!name || !email || !message) {
            return json(res, 400, { type: "error", message: "Missing required fields." });
        }
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            return json(res, 400, { type: "error", message: "Invalid email format." });
        }
        if (honeypot) {
            // Pretend success to bots
            return json(res, 200, { type: "success", message: "OK" });
        }

        // Save to MongoDB
        const db = await getDb();
        const doc = {
            name,
            email,
            message,
            ip: req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "",
            ua: req.headers["user-agent"] || "",
            createdAt: new Date(),
        };
        await db.collection("contacts").insertOne(doc);

        // Send email via Porkbun SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: false, // 587 = STARTTLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const html = `
      <h3>New Contact Message from Swift Designs</h3>
      <table cellspacing="0" cellpadding="6" style="border-collapse: collapse; max-width: 600px">
        <tr><th align="left" style="border:1px solid #ddd;background:#f8f8f8">Name</th><td style="border:1px solid #ddd">${escapeHtml(name)}</td></tr>
        <tr><th align="left" style="border:1px solid #ddd;background:#f8f8f8">Email</th><td style="border:1px solid #ddd">${escapeHtml(email)}</td></tr>
        <tr><th align="left" style="border:1px solid #ddd;background:#f8f8f8">Message</th><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
      </table>
      <p style="color:#999">Sent from swiftdesigns.studio</p>
    `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM,          // e.g. "Swift Designs Website" <no-reply@swiftdesigns.studio>
            to: process.env.SMTP_TO,              // e.g. info@swiftdesigns.studio
            replyTo: `"${name}" <${email}>`,
            subject: "New Contact Form Message — Swift Designs",
            html,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        });

        return json(res, 200, {
            type: "success",
            message: "Message sent successfully. Thank you — I will reply soon.",
        });
    } catch (err) {
        console.error("Contact API error:", err);
        return json(res, 500, {
            type: "error",
            message: "Server error. Please try again later.",
        });
    }
}

// Small helper to avoid HTML injection
function escapeHtml(s) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export const config = {
    api: {
        bodyParser: false, // we handle both JSON & form-encoded manually
    },
};
