
const mongoose = require('mongoose');
module.exports = (mongoUrl) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const User = mongoose.model('User', {
        firstName: String,
        lastName: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, bcrypt: true },
        timestamp: String,
        type: { type: String, required: true, unique: false }
        
    });

    const Days = mongoose.model('Days', {
        username: { type: String, required: true, unique: true },
        days: Array,
        timestamp: String
    });

    return {
        User, Days
    };

};
