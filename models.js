const mongoose = require('mongoose');
module.exports = function(mongoUrl){
    // mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const Username = mongoose.model('Username', {
        name: String,
        username : String,
        password : String
    });

    return {
        Username
    };

};

// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
//
// const user = {
//   username: 'test-user',
//   password: 'test-password',
//   id: 1
// }
//
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     findUser(username, function (err, user) {
//       if (err) {
//         return done(err)
//       }
//       if (!user) {
//         return done(null, false)
//       }
//       if (password !== user.password  ) {
//         return done(null, false)
//       }
//       return done(null, user)
//     })
//   }
// ))
