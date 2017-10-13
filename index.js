const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dbConfig = require('./config/db');
const routes = require('./routes/api');

// setup express app
const app = express();
const port = process.env.port || 9000;


// db connection
mongoose.connect(dbConfig.address);
mongoose.Promise = global.Promise;

// middleware
app.use(bodyParser.json());
app.use('/api', routes);


// error handling middleware
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(422).send({
        error: err._message
    });
});

// listen for requests
app.listen(port, function () {
    console.log('listening on port : ', port)
});