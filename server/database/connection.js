const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://hawa:hawa@cluster0.got4o.mongodb.net/datas?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
