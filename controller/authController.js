const { addNewUser, getUserByEmail } = require('../models/authModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registerUser(req,res) {
    const{name , email, password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await addNewUser(name, email , passwordHash, 'attendee');
    if(result.affectedRows === 0){
        return res.status(400).json({success: false, message:"User registration unsuccessful", statusCode: 400})
    }
    return res.status(201).json({success: true, message:"User registration successful", statusCode: 201})
}

async function loginUser(req,res) {

    const {email, password} = req.body;
    const [[result]] = await getUserByEmail(email);
    console.log(result)
    if(result.length === 0){
        return res.json({success: false, message:"Invalid Email or Password",statusCode:401});
    }
    const isPasswordCorrect = bcrypt.compare(result.password_hash, password );

    if(!isPasswordCorrect){
        return res.json({success: false, message:"Invalid Email or Password", statusCode:401});
    }
    const token = jwt.sign(result, process.env.JWT_SECRET, {expiresIn: '1d'});
    console.log(token);
    res.cookie('loginToken', token, {httpOnly: true});
    res.status(200).redirect('/foryou');
}

module.exports = {registerUser, loginUser};