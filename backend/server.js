const app = require('./app');
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');

//Handling Uncaught Exception
process.on('uncaughtException', err => {
  console.log(err.message);
  console.log('Shutting down the server due to uncaught Exception');
  process.exit(1);
})


dotenv.config({path:"backend/config/config.env"})


connectDatabase();

const server = app.listen(process.env.PORT,()=>{
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

//Unhandled Promise Rejection
process.on('unhandledRejection', (error)=>{
  console.log("Error : ", error.message);
  console.log('Shutting down the server due to unhandled promise rejection');
  
  server.close(()=>{
    process.exit();
  })
})