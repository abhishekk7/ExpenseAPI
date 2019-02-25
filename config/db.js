var db = {
    production: {},
    development: {}
};

db.development.address = 'mongodb://localhost:27017/ExpenseDB';
db.production.address = 'mongodb://admin:admin@ds251985.mlab.com:51985/expensedb';

module.exports = db;
