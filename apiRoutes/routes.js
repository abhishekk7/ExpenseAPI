const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send({
        version1: "/v1"
    });
}).use('/v1', require('./v1/api'));

module.exports = router;