module.exports = function(models) {

    const login = function(req, res, done) {

        var username = req.body.username1;
        // console.log('User: ' + username);

        models.Username.findOne({
            username: req.body.username1
        }, function(err, theUsername) {
            if (err) {
                return done(err)
            }
            // console.log('Details: ' + theUsername);
            res.render('login');
        });

    };


    const waiters = function(req, res, done) {
        res.render('waiters');
    };

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
            }, function(err, theUsername) {
                
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

    return {
        login,
        waiters,
        home
    };
};
