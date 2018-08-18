const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require("mongoose");

const priductsRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders')

app.use(logger('dev'));

//body-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
        return res.status(200).json({});
    }
    next();
});

//routing
app.use('/products', priductsRouter);
app.use('/order', orderRouter);

//mongodb
mongoose.connect('mongodb://localhost/node-shop', 
{ useNewUrlParser: true }, 
function(err, client) {
  if (err) {
    console.log(err);
  }
  console.log('connect!!!');
});

//error
app.use((req, res, next)=>{
    const error = new Error('Not found')
    error.status = 404;
    next(error);
})
app.use((error, req, res, next)=>{
    res.status(error.status|| 500);
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports = app;