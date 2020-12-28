//db.js
const mongoose = require('mongoose'); // this is what we use to connect
const config = require('config'); // we need to grab the string that we put inside default.json
const db = config.get('mongoURI'); // we use this to get the value of the mongoURI

// (Dont use this!!)mongoose.connect(db) // to connect to the database // returns a promise which promises a value

// we're going to use async await instead because it's the new standard and we can make it synchronous

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }); // we want to do this instead because we need that promise

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB; // this allows us to export the method we created and use it somewhere
