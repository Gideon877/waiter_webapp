const mongoose = require('mongoose');
module.exports = function (mongoUrl) {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl, { useNewUrlParser: true });

    const User = mongoose.model('User', {
        firstName: { type: String, required: true, unique: false },
        lastName: { type: String, required: true, unique: false },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, bcrypt: true },
        email: { type: String, required: true, unique: true },
        image: { type: String, required: false },
        country: { type: String, required: false },
        address: { type: String, required: false },
        city: { type: String, required: false },
        code: { type: String, required: false },
        phoneNumber: { type: String, required: false },
        active: { type: Boolean, required: true },
        userType: { type: String, required: true },
        timestamp: {
            created: { type: String, required: true, unique: false },
            lastUpdated: { type: String, required: true, unique: false },
            lastSeen: { type: String, required: true, unique: false },
        }
    });

    const Days = mongoose.model('Days', {
        day: { type: String, required: true, unique: true },
        count: { type: Number, require: false, unique: false },
        waiters: { type: Array, require: false, unique: false, 
            validate: [arrayLimit, '{PATH} exceeds the limit of 3'] },
        timestamp: {
            created: { type: String, required: true, unique: false },
            lastUpdated: { type: String, required: true, unique: false },
        }
    })

    const WaiterDays = mongoose.model('WaiterDays', {
        dayId: { type: String, required: true, unique: false },
        userId: { type: String, required: true, unique: false },
        timestamp: {
            created: { type: String, required: true, unique: false },
            lastUpdated: { type: String, required: true, unique: false },
        }
    })

    const Friends = mongoose.model('Friends', {
        userId: { type: String, required: true, unique: false },
        friendId: { type: String, required: true, unique: false },
        timestamp: {
            created: { type: String, required: true, unique: false },
            lastUpdated: { type: String, required: true, unique: false },
        }
    })

    const Comments = mongoose.model('Comments', {
        postId: { type: String, required: true, unique: false },
        details: { type: String, required: true, unique: true },
        timestamp: String,
        timestamp: {
            created: { type: String, required: true, unique: false },
            lastUpdated: { type: String, required: true, unique: false },
        }
    })

    const Post = mongoose.model('Post', {
        userId: { type: String, required: true, unique: false },
        commentIds: { type: String, required: false, unique: false },
        details: { type: String, required: true, unique: true },
        timestamp: {
            created: { type: String, required: true, unique: false },
            lastUpdated: { type: String, required: true, unique: false },
        }
    })

    function arrayLimit(val) {
        return val.length <= 3;
      }

    return {
        User, Days, WaiterDays, Friends, Comments, Post
    };

};
