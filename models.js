const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
module.exports = function(mongoUrl){
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const Username = mongoose.model('Username', {
        name: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, bcrypt: true },
        days: Array
    });

    return {
        Username
    };

};
