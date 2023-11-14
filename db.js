const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_PORT } = require("./config/config");

const MONGO_DB_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:${MONGO_PORT}/?authSource=admin`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB_URL);
    console.log("Successfully connected to MongoDB Database on PORT: 27017");
  } catch (error) {
    console.error(error);
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
