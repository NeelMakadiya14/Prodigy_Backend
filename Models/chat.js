const mongoose = require("mongoose");
//const timestamp = require("mongoose-timestamp");

const chatSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  photoUri: {
    type: String,
    required: false,
    trim: true,
  },
  msg: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  room: {
    type: String,
    required: true,
    trim: true,
  },
});

//chatSchema.plugin(timestamp);
const chat = mongoose.model("Chat", chatSchema);
module.exports = chat;