module.exports = function(models) {

    const login = function(req, res, done) {
        var mes = '';
        var usernameData = {
            username: req.body.username,
            password: req.body.password
        }
        models.Username.findOne({
            username: req.body.username
        }, function(err, theUsername) {

            if (err) {
                return done(err)
            }
            // New user
            if (!theUsername) {
                models.Username.create({
                    username: req.body.username,
                    password: req.body.password
                }, function(err, result) {
                    if (err) {
                        return done(err);
                    }
                    models.Username.find({
                        username: req.body.username,
                        password: req.body.password
                    }, function(err, results) {
                        if (err) {
                            return done(err);
                        }

                    });
                });
            };
            res.render('login');
        });
    };
//End of login function
    const waiters = function(req, res, done) {
        res.render('waiters');
    };



    return {
        login,
        waiters
    };
};
