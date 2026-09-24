const { getAllEvents, getEventByEventId, getEventsByCategory, getEventsByKeyWord, deleteEventById, addEventToDatabase, changeRowInfo } = require('../models/eventModel');

async function getEvents(req, res) {
    const result = await getAllEvents();
    return res.json(result);
}

async function getEventById(req, res) {
    const id = req.params.id ? Number(req.params.id) : null;
    if (id === null) {
        return res.json({success: false, message: "Invalid Id" });
    };
    const result = await getEventByEventId(id);
    if(result.length === 0){
        return res.status(404).json({success: false, message: "Event Not Found!", statusCode: 404})
    }
    return res.json(result);
}

async function filterByCategory(req, res) {
    const category = req.params.category ? req.params.category.toLowerCase() : null;
    if (!category) {
        return res.json({ Error: "Invalid Category" });
    }
    const result = await getEventsByCategory(category);
    if(result.length === 0){
        return res.status(404).json({success: false, message: "Event Not Found!", statusCode: 404})
    }
    return res.json(result);
}

async function filterByTitle(req, res) {
    const title = req.query.title ? req.query.title.toLowerCase().trim() : null;
    if (!title) {
        return res.json({ Error: "Invalid title" });
    }
    const result = await getEventsByKeyWord(title);
    if(result.length === 0){
        return res.status(404).json({success: false, message: "Event Not Found!", statusCode: 404})
    }
    return res.json(result);
}

async function removeEvent(req, res) {
    const id = req.params.id ? Number(req.params.id) : null;
    if (!id) {
        return res.json({ Error: "Invalid Id" });
    };
    const result = await deleteEventById(id);
    if(result.affectedRows === 0){
        return res.status(404).json({success: false, message: "Event Not Found!", statusCode: 404})
    }
    return res.status(200).json({success: true, message: "Event deleted successfully!", statusCode: 200});
};
async function createEvent(req, res) {
    const organiserId = req.user || 1;
    const { title, description, location, category, start_datetime, end_datetime } = req.body;
    const result = await addEventToDatabase(organiserId, title, description, location, category, start_datetime, end_datetime);
    if(result.affectedRows === 0){
        return res.status(400).json({success: false, message: "Event creation failed", statusCode: 400})
    }
    return res.status(201).json({success: true, message: "Event created successfully!", statusCode: 201});
}

async function updateEvent(req, res) {
    const id = req.params.id;

    const { title, description, location, category, start_datetime, end_datetime } = req.body;
    const result = await changeRowInfo(id, title, description, location, category, start_datetime, end_datetime);
    if(result.affectedRows === 0){
        return res.status(400).json({success: false, message: "Event creation failed", statusCode: 400})
    }
    return res.status(200).json({success: true, message: "Event created successfully!", statusCode: 200});
}


module.exports = { removeEvent, filterByCategory, filterByTitle, getEventById, getEvents, createEvent ,updateEvent};