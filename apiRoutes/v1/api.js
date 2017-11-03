const express = require('express');
const router = express.Router();
const Expense = require('../../models/Expense');
const User = require('../../models/User');
const pck = require('../../package.json');

// get api details
router.get('/', function (req, res, next) {
    res.send({
        name: pck.name,
        type: pck.description,
        version: pck.version,
        author: pck.author
    });
});

// get all expenses
router.get('/expenses', function (req, res, next) {
    Expense.find({}).then(function (data) {
        res.send(data);
    });
});

// get one expense
router.get('/expenses/:id', function (req, res, next) {
    Expense.findById(req.params.id).then(function (expense) {
        res.send(expense);
    });
});

// add a new expense to the db
router.post('/expenses', function (req, res, next) {
    Expense.create(req.body).then(function (expense) {
        res.send(expense);
    }).catch(next);
});

// add a new expense to the db
router.put('/expenses/:id', function (req, res, next) {
    Expense.findByIdAndUpdate(req.params.id, req.body).then(function () {
        Expense.findById(req.params.id).then(function (expense) {
            res.send(expense);
        });
    });
});

// delete a expense from the db
router.delete('/expenses/:id', function (req, res, next) {
    Expense.findByIdAndRemove(req.params.id).then(function (expense) {
        res.send(expense);
    });
});

// get all users
router.get('/users', function (req, res, next) {
    User.find({}).then(function (data) {
        res.send(data);
    });
});

// get one user
router.get('/users/:id', function (req, res, next) {
    User.findById(req.params.id).then(function (data) {
        res.send(data);
    });
});

// get by email
router.get('/login', function (req, res, next) {
    User.findOne({ 'email': req.query.email }).then(function (data) {
        res.send(data);
    });
});

module.exports = router;