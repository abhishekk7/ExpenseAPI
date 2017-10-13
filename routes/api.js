const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next){
    res.send('api');
}).use('/v1', require('./v1/api'));

module.exports = router;