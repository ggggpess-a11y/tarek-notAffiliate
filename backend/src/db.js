const mongoose = require('mongoose');
const { config } = require('./config');

async function connectDb() {
  if (!config.mongoUri) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(config.mongoUri, {
    dbName: process.env.MONGO_DB_NAME || 'tarekAffiliate',
  });
}

module.exports = { connectDb };
