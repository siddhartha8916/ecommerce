const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB Connected with server ${data.connection.host}`);
    })
    // .catch((err) => {
    //   console.log("Error : ", err);
    // });
    //Commented due to Promise Handling in server.js file
};

module.exports = connectDatabase;
