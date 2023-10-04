const mongoose = require('mongoose');

// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Define the MongoDB connection URI using an environment variable
const uri = process.env.MONGODB_URI;

const dbConnect = () => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  });

  const connection = mongoose.connection;

  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });

  connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
};

// Export the dbConnect function
module.exports = dbConnect;
