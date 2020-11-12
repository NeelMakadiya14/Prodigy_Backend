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
  GID: {
    type: String,
    required: true,
    trim: true,
  },
  doc_name: {
    type: String,
    required: true,
    trim: true,
  },
  doc_id: {
    type: String,
    required: true,
    trim: true,
  },
});

//chatSchema.plugin(timestamp);
const user_doc = mongoose.model("User_Doc", chatSchema);
module.exports = user_doc;