// db.js
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'OldPhoneDeals';

// Create a new MongoDB client
const client = new MongoClient(url, { useUnifiedTopology: true });

// Connect to the MongoDB server
const connect = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Get the reference to the MongoDB database
const getDatabase = () => client.db(dbName);

module.exports = {
  connect,
  getDatabase,
};
