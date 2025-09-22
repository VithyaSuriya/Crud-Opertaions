const express = require("express");
const connectDB = require("./config/db");
const config=require("./config/env")
const app = express();
const IndexRouter=require('./routes/index');
app.use(express.json())
app.use('/',IndexRouter)
connectDB()
const PORT=config.port|| 5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})