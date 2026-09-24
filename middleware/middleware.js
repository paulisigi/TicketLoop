const jwt = require('jsonwebtoken');
require('dotenv').config();

function logger(req, res, next) {
    console.log(req.method, req.url, res.statusCode);
    next();
}

function checkEventBody(req, res, next) {
    const { title, description, category, location, start_datetime, end_datetime } = req.body;
    console.log({ title, description, category, location, start_datetime, end_datetime });
    if (!title || !description || !location || !category || !start_datetime || !end_datetime || title.trim === '' || description.trim === '' || location.trim === '' || category.trim === '' || category.trim === '' || start_datetime.trim === '' || end_datetime.trim === '') {
        return res.status(400).json({ message: "Invalid Body Input" });
    }

    req.body.title = title.trim();
    req.body.description = description.trim();
    req.body.location = location.trim();
    req.body.start_datetime = start_datetime.trim();
    req.body.end_datetime = end_datetime.trim();
    next();
}

function checkRegisterInfo(req, res, next) {
    const { name, email, password } = req.body;
    if (!name || !email || !password || name.trim() === '' || email.trim() === '' || password.trim() === '') {
        return res.status(400).json({ message: "Invalid Body Input" });
    }
    req.body.name = name.trim();
    req.body.password = password.trim();
    req.body.email = email.trim();
    next();
}

function checkLoginInfo(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password || email.trim() === '' || password.trim() === '') {
        return res.status(400).json({ message: "Invalid Body Input" });
    }
    req.body.password = password.trim();
    req.body.email = email.trim();
    next();
}


function authenticateToken(req, res, next) {
    const token = req.cookies['loginToken'];
    if (!token) {
        return res.json({ success: false, message: "User is not logged in!" })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.redirect('/');
        req.user = user;
        next();
    });
}


function checkForExistingToken(req, res, next) {
    const existingToken = req.cookies['loginToken'];
    if (existingToken) {
        return res.redirect('/foryou');
    }
    next();


}

module.exports = { logger, checkEventBody, checkRegisterInfo, checkLoginInfo, authenticateToken, checkForExistingToken };