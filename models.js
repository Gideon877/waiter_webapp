const mongoose = require('mongoose');
module.exports = function(mongoUrl){
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const Username = mongoose.model('Username', {
        username : String,
        password : String
    });

    return {
        Username
    };

};
