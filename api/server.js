const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    console.log('database connection succesfully');
  })
  .catch((err) => {
    console.log('ERROR 🧨:', err);
  });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
