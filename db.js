const monogoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    console.log(process.env.MONGO_URI);
  try {
    const conn = await monogoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;