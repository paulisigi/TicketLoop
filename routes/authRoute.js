const { registerUser, loginUser } = require('../controller/authController');
const express = require('express');
const { checkLoginInfo, checkRegisterInfo, checkForExistingToken } = require('../middleware/middleware');

const router = express.Router();

router.post('/register',checkRegisterInfo, registerUser);
router.post('/login', checkForExistingToken, checkLoginInfo, loginUser);

module.exports = router;
