const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
  },
});

const DataDb = mongoose.model("data", schema);

module.exports = DataDb;
