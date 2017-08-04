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

        var username = req.body.username1;
        var password = req.body.password1;

        console.log('username', username);

        models.Username.findOne({
            username: req.body.username1
        }, function(err, user) {

            console.log('user', user);

            if (err) {
                return done(err)
            }

            if (user) {

                // req.session.user = user;

                console.log("User K: " + user); //works
                // res.json({
                //     user: user
                // });

                if (password !== user.password) {
                    req.flash('error', 'Wrong password or username!');
                    res.render('login');
                } else if (password == user.password) {
                    console.log('You are logged in');

                    res.redirect('waiters')
                }

            }

            if (!user) {
                req.flash('error', "Username should not be blank!");
                // console.log("Username doesn't exist!");
                res.render('login');
            }
        });
    };

    const waiters = function(req, res, done) {
        res.render('waiters');
    };


    return {
        login,
        waiters,
        home
    };
};
