const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
    user: {
        type: String,
        default: "1"
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: [true, "Category is Required"]
    }
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense;