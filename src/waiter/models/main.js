const mongoose = require('mongoose');
module.exports = function(mongoUrl){
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const User = mongoose.model('User', {
        firstName: String,
        lastName: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, bcrypt: true },
        email: { type: String, required: true, unique: true},
        image: { type: String, required: false },
        country: { type: String, required: false },
        address: { type: String, required: false },
        city: { type: String, required: false },
        code: { type: String, required: false },
        phoneNumber: { type: String, required: false },
        active: { type: Boolean, required: true},
        userType: { type: String, required: true},
    });

    const Days = mongoose.model('Days', {
        day: { type: String, required: true, unique: true }, //'Sunday',
    })

    const WaiterDays = mongoose.model('WaiterDays', {
        dayId: { type: String, required: true, unique: true },
        userId: { type: String, required: true, unique: false }
    })

    const Friends = mongoose.model('Friends', {
        userId: { type: String, required: true, unique: false },
        friendId: { type: String, required: true, unique: false }
    })

    const Comments = mongoose.model('Comments', {
        postId: { type: String, required: true, unique: false },
        details: { type: String, required: true, unique: true },
        timestamp: String,
    })

    const Post = mongoose.model('Post', {
        userId: { type: String, required: true, unique: false },
        commentIds: { type: String, required: false, unique: false },
        details: { type: String, required: true, unique: true },
    })

    return {
        User, Days, WaiterDays, Friends, Comments, Post
    };

};
