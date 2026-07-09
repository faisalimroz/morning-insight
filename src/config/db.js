const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
 console.log('done',uri);
    const conn = await mongoose.connect(uri, clientOptions);
 
    console.log(`MongoDB connected: ${conn.connection.host}`);
     await mongoose.connection.db.admin().command({ ping: 1 });
   
    console.log(`Database: ${conn.connection.name}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
};

module.exports = connectDB;