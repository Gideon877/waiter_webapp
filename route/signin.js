"use strict"
module.exports = function(models) {

    const login = function(req, res, done) {
        var body = req.body;
        if (!body && !body.username) {
            req.flash('error', "Username should not be blank!");
            res.render('login');
        }
        models.Username.findOne({
            username: body.username,
            password: body.password
        }, function(err, user) {
            if (err)
                return done(err);

            if (!user && !user.username) {
                req.flash('error', 'Wrong password or username!!');
                res.render('login');
            }
            if (user && user.username) {
                req.session.user = user;
                if (user.username == 'admin') {
                    res.redirect('days');
                }

                if (user.username !== 'admin') {
                    res.redirect('waiters/' + user.id);
                }
            }
        });

    };

    const sign_in = function(req, res, done) {
        var session = req.session;
        if (session && session.user) { // Check if session exists
            models.Username.findOne({
                username: session.user.username
            }, function(err, user) {
                // if the user isn't found in the DB, reset the session info and
                // redirect the user to the login page
                if (!user) {
                    session.reset();
                    res.redirect('/login');
                } else {
                    session.user = user; // expose the user to the template
                    if (user.username == 'admin') { // redirect the admin page
                        res.redirect('days');
                    } else { // redirect the waiter page
                        res.redirect('waiters/' + user.id);
                    }
                }
            });
        } else {
            res.render('login');
        }
    }
    return {login, sign_in}
}
