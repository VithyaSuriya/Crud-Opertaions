const mongoose = require("mongoose");
const config=require("../config/env")

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodbUrl);
    console.log("Mongodb connected");
  } catch (err) {
    console.error(err.message);
  }
};
module.exports=connectDB