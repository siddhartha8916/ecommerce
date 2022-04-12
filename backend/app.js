const express = require('express');

const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())

//Route imports 
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
app.use('/api',productRoute);
app.use('/user',userRoute);


//Middleware for Error
app.use(errorMiddleware);

module.exports = app;