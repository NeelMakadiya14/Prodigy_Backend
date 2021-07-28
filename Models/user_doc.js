const mongoose = require("mongoose");
// const timestamp = require("mongoose-timestamp");

const userSchema = new mongoose.Schema({
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
  doc: {
    type: [
      {
        name: String,
        id: String,
      },
    ],
  },
});

// docSchema.plugin(timestamp);
const user_doc = mongoose.model("User_Doc", userSchema);
module.exports = user_doc;
