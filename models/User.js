const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    first_name: {
        type: String,
        required: [true, "First Name is Required"]
    }, 
    last_name: {
        type: String,
        required: [true, "Last Name is Required"]
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;