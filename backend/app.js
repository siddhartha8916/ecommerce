const express = require('express');
const cors = require('cors');

const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error')

app.use(express.json())
app.use(cookieParser())
app.use(cors());


//Route imports 
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
app.use('/api',productRoute);
app.use('/user',userRoute);
app.use('/order',orderRoute);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;