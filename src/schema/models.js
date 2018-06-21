const mongoose = require('mongoose');
module.exports = function(mongoUrl){
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const Waiter = mongoose.model('Waiter', {
        name: { type: String, required: true },
        surname: { type: String, required: false },
        username: { type: String, required: true, unique: false },
        password: { type: String, required: true, bcrypt: true },
        timestamp: {
            created: String,
            lastUpdated: String,
            lastSeen: String,
        },
    });

    return {
        Waiter
    };

};
