const express = require('express');
const router = express.Router();
const Expense = require('../../models/Expense');

// get all expenses
router.get('/', function (req, res, next) {
    Expense.find({}).then(function (data) {
        res.send(data);
    });
});

// get one expense
router.get('/:id', function (req, res, next) {
    Expense.findById(req.params.id).then(function (expense) {
        res.send(expense);
    });
});

// add a new expense to the db
router.post('/', function (req, res, next) {
    Expense.create(req.body).then(function (expense) {
        res.send(expense);
    }).catch(next);
});

// add a new expense to the db
router.put('/:id', function (req, res, next) {
    Expense.findByIdAndUpdate(req.params.id, req.body).then(function () {
        Expense.findById(req.params.id).then(function (expense) {
            res.send(expense);
        });
    });
});

// delete a expense from the db
router.delete('/:id', function (req, res, next) {
    Expense.findByIdAndRemove(req.params.id).then(function (expense) {
        res.send(expense);
    });
});


module.exports = router;