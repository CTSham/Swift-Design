// lib/mongo.js
const { MongoClient } = require("mongodb");

let cached = global._mongo;
if (!cached) cached = global._mongo = { client: null, db: null };

async function getDb() {
    if (cached.db) return cached.db;

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB || "swift";

    if (!uri) throw new Error("Missing MONGODB_URI");
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    await client.connect();

    cached.client = client;
    cached.db = client.db(dbName);
    return cached.db;
}

module.exports = { getDb };
