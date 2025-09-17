const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb connected");
  } catch (err) {
    console.error(err.message);
  }
};
module.exports=connectDB
