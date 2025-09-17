const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const IndexRouter=require('./routes/index')
app.use(bodyParser.json());
app.use('/',IndexRouter)
connectDB(mongoose);
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
//ggggghgghghghhg