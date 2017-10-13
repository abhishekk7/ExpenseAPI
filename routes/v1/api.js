const express = require('express');
const router = express.Router();
const Expense = require('../../models/Expense');
const pck = require('../../package.json');

router.get('/', function (req, res, next) {
    res.send({
        name: pck.name,
        type: pck.description,
        version: pck.version,
        author: pck.author
    });
});

router.get('/expenses', function (req, res, next) {
    Expense.find({}).then(function (data) {
        res.send(data);
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


module.exports = router;