const express = require('express')
require('dotenv').config()
const mongoose = require("mongoose"); // per mongo db
const cors = require('cors');
const connectDB = require('./config/db')
var bodyParser = require('body-parser')

const app = express()
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: false})) 


/*
** IP ADDRESS ** 
*/
  

app.use(cors(corsOptions))
app.options('*', cors());
const PORT = (process.env.APP_PORT != '') ? process.env.APP_PORT : process.env.DEV_PORT;

app.use('/user',require('./routes/User'));
app.use('/todo',require('./routes/Todo'));
app.use('/cattodo',require('./routes/CatTodo'));

connectDB() 
        
app.get('/', (req, res) => {    return res.json({msg : 'ok'}) })

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})