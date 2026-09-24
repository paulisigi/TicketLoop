const express = require('express');
const router = express.Router();
const path = require('path');
const { authenticateToken } = require('../middleware/middleware');


router.get('/', authenticateToken ,(req,res)=>{
    res.sendFile(path.join(__dirname, '..','public', 'dashboard.html'));
});

module.exports = router;