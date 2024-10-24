// db.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Replace with your MongoDB connection string
const mongoURI = process.env.MongoUrl;

// Connect to MongoDB
const username = 'Prathamesh1712';
const password = process.env.MongoPass;
const dbName = 'Billing';  // Replace with your database name
const clusterEndpoint = 'medicalapp.cfmceoy2uckn.ap-south-1.docdb.amazonaws.com:27017';
const caFilePath = '/home/ubuntu/WebStars_anantya_bacckend/global-bundle.pem';  // Ensure the CA file path is correct
const url = `mongodb://${username}:${password}@${clusterEndpoint}/${dbName}?tls=true&tlsCAFile=${caFilePath}`;
mongoose.connect(url);

// Optional: handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Optional: handle process termination to gracefully close the MongoDB connection
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed due to app termination');
  process.exit(0);
});

module.exports = mongoose;
