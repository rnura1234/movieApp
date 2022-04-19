const mongoose= require('mongoose');

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: String,
    genre: String,
    context: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const MovieList = mongoose.model('MovieList', listSchema);
module.exports = MovieList;
