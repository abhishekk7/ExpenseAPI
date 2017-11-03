const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// get all users
router.get('/', function (req, res, next) {
    User.find({}).then(function (data) {
        res.send(data);
    });
});

// get one user
router.get('/:id', function (req, res, next) {
    User.findById(req.params.id).then(function (data) {
        res.send(data);
    });
});

module.exports = router;