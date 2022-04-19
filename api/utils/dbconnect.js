const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
// const db = `mongodb+srv://sanjeev:pZzP1IHh0IBr8Nuc@cluster0.hqq9x.mongodb.net/movieapp?retryWrites=true&w=majority`;
// console.log(process.env.DATABASE);
const db = mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connection succesfully');
  })
  .catch((err) => {
    console.log('something wrong', err);
  });

module.exports = db;
