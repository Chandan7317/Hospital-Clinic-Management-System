const mongoose = require("mongoose");

const connectDB = async () => {
  const client = await mongoose.connect(process.env.MONGODB_URL);
  console.log("Database is connect", client.connection.host);
};
module.exports = connectDB;
