require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

async function test() {
  try {
    console.log("Connecting to", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Successfully connected!");
    process.exit(0);
  } catch (err) {
    console.error("Connection error:", err.message);
    process.exit(1);
  }
}

test();
