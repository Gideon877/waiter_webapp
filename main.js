module.exports = function(models) {

    const home = function(req, res, done) {

        var usernameData = {
            username: req.body.username
        }

        if (!usernameData || !usernameData.username) {
            req.flash('error', 'Username should not be blank');
            res.render('home')
        }

        else {

            models.Username.findOne({
                username: req.body.username
            }, function(err, user) {

                if (err) {
                    return done(err)
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
                        });
                    });
                };
                res.render('home');
            });
        }
    };

    const login = function(req, res, done) {

        var username = req.body.username1;
        var password = req.body.password1;

            models.Username.findOne({
                username: req.body.username1
            }, function(err, user) {

                if (err) {
                    return done(err)
                }

                if (user) {


                    // if (passport !== user.password) {
                    //     return done(err)
                    // }
                    // else {
                    // }

                    res.render('waiters');
                }

                res.render('login');
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
