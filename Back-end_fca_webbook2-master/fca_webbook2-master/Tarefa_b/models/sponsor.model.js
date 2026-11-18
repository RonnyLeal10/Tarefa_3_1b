
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CONFIG = require("../../config/config");

const sponsorSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  contact: {
    type: String,
    required: true
  },

  animal: {
    type: String,
    ref: CONFIG.mongodb.collections.animal,
    required: true
  },

  active: {
    type: Boolean,
    default: true
  }
});

module.exports = global.mongoConnection.model(
  CONFIG.mongodb.collections.sponsor,
  sponsorSchema
);
