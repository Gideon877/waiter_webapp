'use strict'
module.exports = function(models) {

    const home = function(req, res, done) {
        var usernameData = {
            username: req.body.username
        };

        if (!usernameData || !usernameData.username) {
            req.flash('error', 'Registration box should not be blank!');
            res.render('home')
        } else {

            models.Username.findOne({
                username: req.body.username
            }, function(err, user) {
                if (err) {
                    return done(err)
                }
                if (user) {
                    req.flash('error', 'Username already taken!');
                    res.render('home')
                } else {
                    models.Username.create({
                        name: req.body.name,
                        username: req.body.username,
                        password: req.body.password
                    }, function(err, result) {
                        if (err) {
                            return done(err);
                        }
                        if (!result) {
                            req.flash('error', 'Registration failed!');
                            res.render('home')
                        } else {
                            res.redirect('login');

                        }
                    });
                };
            });
        }
    };

    const login = function(req, res, done) {
        var userData = {
            username: req.body.username,
            password: req.body.password
        }
        if (userData.username !== undefined) {
            models.Username.findOne({
                username: req.body.username,
                password: req.body.password
            }, function(err, user) {

                if (err) {
                    return done(err)
                }

                if (!user || user == null) {
                    req.flash('error', 'Wrong password or username!!');
                    res.render('login')
                }
                if (user) {

                    req.session.user = user;
                    if (user.username == 'admin') {
                        res.redirect('days');
                    }

                    if (user.username !== 'admin') {
                        res.redirect('waiters/' + user.id)
                    }
                }
            });
        }

        if (userData.username == undefined) {
            req.flash('error', "Username should not be blank!");
            res.render('login');
        }
    }

    const sign_in = function(req, res, done) {
        if (req.session && req.session.user) { // Check if session exists
            models.Username.findOne({
                username: req.session.user.username
            }, function(err, user) {
                if (!user) {
                    // if the user isn't found in the DB, reset the session info and
                    // redirect the user to the login page
                    req.session.reset();
                    res.redirect('/login');
                } else {
                    // expose the user to the template
                    req.session.user = user;
                    res.locals.user = user;
                    // redirect the waiter page
                    res.redirect('waiters/' + user.id)
                }
            });
        } else {
            res.render('login');
        }
    }

    const dashboard = function(req, res, done) {
        var user_id = req.params.user_id;

        if (req.session && req.session.user) {
            models.Username.findOne({
                '_id': user_id
            }, function(err, user) {
                console.log('USER', user);
                if (!user) {
                    // if the user isn't found in the DB, reset the session info and
                    // redirect the user to the login page
                    req.session = null;
                    res.redirect('/login');
                }
                if (user) {
                    res.render('waiters')
                }
            })

        } else {
            res.redirect('/login');
        }
    }

    return {
        home,
        login,
        sign_in,
        dashboard
    }
}
