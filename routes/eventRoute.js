const express = require('express');
const router = express.Router();
const { removeEvent, filterByCategory, filterByTitle, getEventById, getEvents, createEvent, updateEvent } = require('../controller/eventController');
const { checkEventBody, authenticateToken } = require('../middleware/middleware');

router.get('/search', authenticateToken, filterByTitle);
router.get('/', authenticateToken, getEvents);
router.get('/:id', authenticateToken, getEventById);
router.get('/category/:category', authenticateToken, filterByCategory);
router.delete('/:id', authenticateToken, removeEvent);
router.post('/', authenticateToken, checkEventBody, createEvent);
router.put('/:id', authenticateToken, checkEventBody, updateEvent);

module.exports = router;