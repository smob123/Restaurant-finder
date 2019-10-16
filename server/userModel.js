const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: String,
    username: String,
    password: String,
    jwt: String
});

module.exports = mongoose.model('User', userSchema);
