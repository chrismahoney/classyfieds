const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      
    });

    console.log(`Connected to MongoDB OK: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDb;