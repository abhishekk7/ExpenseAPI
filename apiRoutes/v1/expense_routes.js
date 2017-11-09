const express = require('express');
const router = express.Router();
const Expense = require('../../models/Expense');

// get all expenses
router.get('/', function (req, res, next) {
    var query = {};
    if (req.query.user) {
        query = req.query;
    }
    Expense.find(query).then(function (expense) {
        res.send(expense);
    });
});

// group by category
router.get('/group', function (req, res, next) {
    Expense.aggregate({ '$group': { _id: '$category', total: { $sum: '$amount' }, count: {$sum: 1} } }).then(function (data) {
        res.send(data);
    }, next);
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