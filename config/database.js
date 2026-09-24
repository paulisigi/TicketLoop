const mysql = require('mysql2/promise');
require('dotenv').config();
try {
    const db = mysql.createPool({
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        database: process.env.DB_NAME
    });
    console.log("MySQL Database Connected! ");
    module.exports = db;
} catch (error) {
    console.log("Database Connection Error: ", error);
}