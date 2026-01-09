require("dotenv").config();
const mysql = require("mysql2");

// Validate required environment variables
if (!process.env.DB_PASSWORD) {
    console.error("ERROR: DB_PASSWORD environment variable is not set!");
    console.error("Please create a .env file based on .env.example");
    process.exit(1);
}

const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "PetShop"
});

module.exports = db;