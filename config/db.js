var db = {
    production: {},
    development: {}
};

db.development.address = 'mongodb://localhost:27017/outlaydb';
db.production.address = 'mongodb://admin:admin@ds251985.mlab.com:51985/outlaydb';

module.exports = db;
