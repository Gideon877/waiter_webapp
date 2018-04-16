"use strict"
module.exports = function(models) {

    const home = function(req, res, done) {
        var body = req.body
        if (!body || !body.username) {
            req.flash('error', 'Registration box should not be blank!');
            res.render('home');
        }

        models.Username.findOne({
            username: body.username
        }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                req.flash('error', 'Username already taken.');
                res.render('home');
            } else {
                models.Username.create({
                    name: body.name,
                    username: body.username,
                    password: body.password,
                    timestamp: new Date()
                }, function(err, result) {
                    if (err) {
                        return done(err);
                    }
                    if (!result) {
                        req.flash('error', 'Registration failed!');
                        res.render('home');
                    } else {
                        res.redirect('login');
                    }
                });
            }
        });
    };

    return {
        home
    }
}
