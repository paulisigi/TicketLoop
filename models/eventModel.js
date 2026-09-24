const db = require('../config/database');

async function getAllEvents() {
    try {
        const [result] = await db.query('SELECT * FROM events');
        return result;
    } catch (error) {
        console.log("Database Error: ", error);
    }
}

async function getEventByEventId(id) {
    try {
        const [result] = await db.query("SELECT * FROM events WHERE id = ?", [id]);
        return result;
    } catch (error) {
        console.log("Database Error: ", error);
    }
}

async function getEventsByCategory(category) {
    try {
        const [result] = await db.query('SELECT * FROM events WHERE category = ?', [category]);
        return result;
    } catch (error) {
        console.log("Database Error: ", error);
    }
}

async function getEventsByKeyWord(title) {
    try {

        // Return empty array if input is invalid or whitespace-only
        if (!title || typeof title !== 'string' || !title.trim()) {
            return [];
        }

        const cleanTitle = title.trim();

        // Performs case-insensitive partial match
        const [rows] = await db.query(
            'SELECT * FROM events WHERE LOWER(title) LIKE LOWER(?)',
            [`%${cleanTitle}%`]
        );

        return rows;

    } catch (error) {
        console.error("Database Error in getEventsByKeyWord:", error.message);
        throw error;
    }
}

async function deleteEventById(id) {
    try {
        const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);
        return result;
    } catch (error) {
        console.log("Database Error: ", error);
    }
}

async function addEventToDatabase(organizer_id, title, description, location, category, start_date, end_date) {
    try {
        const result = await db.query("INSERT INTO events( organizer_id, title,description,location,category,start_datetime,end_datetime) VALUES( ?, ?, ?, ?, ?, ?, ?)", [organizer_id, title, description, location, category, start_date, end_date]);
        return result;
    } catch (error) {
        console.log("Database Error: ", error);
    }
}

async function changeRowInfo(id, title, description, location, category, start_datetime, end_datetime) {
    try {
        const result = await db.query('UPDATE events SET title = ?, description = ?, location = ?, category = ?, start_datetime = ?, end_datetime = ? WHERE id = ?', [title, description, location, category, start_datetime, end_datetime, id]);
        return result;
    } catch (error) {
        console.log("Database Error: ", error);
    }
}

module.exports = { deleteEventById, getAllEvents, getEventByEventId, getEventsByCategory, getEventsByKeyWord, addEventToDatabase, changeRowInfo };