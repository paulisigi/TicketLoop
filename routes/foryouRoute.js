const express = require('express');
const router = express.Router();
const path = require('path');
const { authenticateToken } = require('../middleware/middleware');


router.get('/', authenticateToken ,(req,res)=>{
    res.sendFile(path.join(__dirname, '..','public', 'foryou.html'));
});

router.get('/user', authenticateToken, (req,res)=>{
    res.json({name: req.user.name, email : req.user.email});
})

module.exports = router;