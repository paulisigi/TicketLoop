const express = require('express');
const app = express();
const cookies = require('cookie-parser');
const path = require('path');
const { logger } = require('./middleware/middleware');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookies());
app.use(logger);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use('/auth', require('./routes/authRoute'));
app.use('/events', require('./routes/eventRoute'));
app.use('/foryou', require('./routes/foryouRoute'));
app.use('/dashboard', require('./routes/dashboardRoute'));


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})