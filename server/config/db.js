const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("MongoDB is connected successfully");
    })
    .catch((error) => {
      console.error("Database Issue", error);
      process.exit(1);
    });
};

module.exports = connectDB;
