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

                            if (!results) {
                                req.flash('error', 'Registration failed!');
                                res.render('home')
                            } else {
                                res.redirect('login');

                            }
                        });
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
            var password = req.body.password

            if (userData.username == 'admin' && userData.password == '0000') {
                res.redirect('days');
            } else {

                models.Username.findOne({
                    username: req.body.username
                }, function(err, user) {

                    if (err) {
                        return done(err)
                    }

                    if (user) {

                        if (password !== user.password) {
                            req.flash('error', 'Wrong password or username!');
                            console.log('user_id', user._id);
                            res.render('login');
                        } else if (password == user.password) {
                            res.redirect('waiters/' + user.id)
                        }
                    }

                    if (!user || user == null) {
                        req.flash('error', 'No user found with this name!');
                        res.render('login')
                    }
                });
            }
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
                return done(err);
            }

            var waiter_days = req.body

            if (!waiter_days.days) {
                req.flash('error', "Username should not be blank!");
                res.render('waiters');
            }

            if (waiter_days.days) {
                user.days = waiter_days.days;

                user.save(function(err, result) {
                    if (err) {
                        return done(err)
                    };
                });

                res.render('waiters');

            }


        });
    };


    return {
        login,
        waiters,
        home
    };
};
