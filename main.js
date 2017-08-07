module.exports = function(models) {

    const home = function(req, res, done) {

        var usernameData = {
            username: req.body.username
        }

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
                        models.Username.find({
                            username: req.body.username
                        }, function(err, results) {
                            if (err) {
                                return done(err);
                            }

                            if (results) {
                                req.flash('success', 'Registration complete!');
                                res.render('home')
                            }
                        });
                    });
                    res.render('home');
                };
            });
        }
    };

    const login = function(req, res, done) {

        var userData = {
            username: req.body.username1,
            password: req.body.password1
        }

        if (userData.username !== undefined) {
            var password = req.body.password1

            models.Username.findOne({
                username: req.body.username1
            }, function(err, user) {

                if (err) {
                    return done(err)
                }

                if (user) {
                    console.log('user', user);
                    if (password !== user.password) {
                        req.flash('error', 'Wrong password or username!');
                        console.log('user_id', user._id);
                        res.render('login');
                    }

                    else if (password == user.password) {
                        console.log('You are logged in as: ' + user.username);
                        res.redirect('waiters/' + user.id)
                    }
                }
                if (!user || user == null) {
                    req.flash('error', 'No user found with this name!');
                    res.render('login')
                }
            });
        }

        if (userData.username == undefined) {
            req.flash('error', "Username should not be blank!");
            res.render('login');
        }
    }

    const waiters = function(req, res, done) {
        var user_id = req.params.user_id;

        models.Username.findOne({
            '_id': user_id
        }, function(err, user) {

            if (err) {
                return done(err)
            }

            if (!user || user == null) {
                req.flash('error', 'No user found with this name!');
                res.render('login')
            }

            if (user && user !== null) {

                var outputMessage = "Welcome " + user.name + ".";

                var data_3 = {
                    outputMessage: outputMessage
                }
                res.render('waiters', data_3);
            }
        });
    };


    return {
        login,
        waiters,
        home
    };
};
