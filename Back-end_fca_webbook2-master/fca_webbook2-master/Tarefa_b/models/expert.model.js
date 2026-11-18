
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../../config/config");

const expertSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  specialization: {
    type: String,
    required: true
  },

  species: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    default: true
  }
});

module.exports = global.mongoConnection.model(
  CONFIG.mongodb.collections.expert,
  expertSchema
);
