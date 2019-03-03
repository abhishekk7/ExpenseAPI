const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const pck = require('../../package.json');
const bcrypt = require('bcrypt');

// get api details
router.get('/', function (req, res, next) {
    res.send({
        name: pck.name,
        type: pck.description,
        version: pck.version,
        author: pck.author,
        models: {
            expense: '/expenses',
            user: '/users'
        }
    });
})
    .use('/expenses', require('./expense_routes'))
    .use('/users', require('./user_routes'))
    .use('/plaid', require('./plaid_routes'));

// get user by email
router.get('/login', function (req, res, next) {
    let password = req.body.password;
    console.log(password);
    User.findOne({ 'email': req.body.email }).then(function (data) {
        if(bcrypt.compareSync(password, data.password)) {
            return res.send(data);
        }
        res.send('User Not Found', 401);
    });
});

module.exports = router;