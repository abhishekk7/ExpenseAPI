const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dbConfig = require('./config/db');
const routes = require('./apiRoutes/routes');

// setup express app
const app = express();
const port = process.env.PORT || 9000;


// db connection
mongoose.connect(dbConfig.address);
mongoose.Promise = global.Promise;

// middleware

app.use(morgan('dev'));
// parse application/json 
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', routes);

// error handling middleware
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(422).send({
        error: err.message
    });
});

// listen for requests
app.listen(port, function () {
    console.log('listening on port : ', port)
});