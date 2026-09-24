
const db = require('../config/database');

async function addNewUser(name, email, passwordHash, role) {
    const result = await db.query("INSERT INTO users(name, email, password_hash, role) VALUES(?, ?,?,?)",[name, email, passwordHash, role]);
    return result;
}

async function getUserByEmail(email) {
    const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return result;
}


module.exports = {addNewUser, getUserByEmail}