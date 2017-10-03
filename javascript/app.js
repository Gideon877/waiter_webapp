"use strict"
module.exports = function(models) {

    const home = function(req, res, done) {
        var usernameData = {
            username: req.body.username
        };

        if (!usernameData || !usernameData.username) {
            req.flash('error', 'Registration box should not be blank!');
            res.render('home');
        } else {

            models.Username.findOne({
                username: req.body.username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    req.flash('error', 'Username already taken!');
                    res.render('home');
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
                            res.render('home');
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
                    return done(err);
                }

                if (!user || user == null) {
                    req.flash('error', 'Wrong password or username!!');
                    res.render('login');
                }
                if (user) {
                    req.session.user = user;
                    if (user.username == 'admin') {
                        res.redirect('days');
                    }

                    if (user.username !== 'admin') {
                        res.redirect('waiters/' + user.id);
                    }
                }
            });
        }

        if (userData.username == undefined) {
            req.flash('error', "Username should not be blank!");
            res.render('login');
        }
    };

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
                    // redirect the admin page
                    if (user.username == 'admin') {
                        res.redirect('days');
                    }
                    // redirect the waiter page
                    if (user.username !== 'admin') {
                        res.redirect('waiters/' + user.id);
                    }
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
                if (!user) {
                    // if the user isn't found in the DB, reset the session info and
                    // redirect the user to the login page
                    req.session = null;
                    res.redirect('/login');
                }
                if (user) {
                    var msg = 'Welcome, ' + user.name + '.';
                    var dayObj = {};
                    user.days.forEach(function(day) {
                        dayObj[day] = true;
                    });
                    models.Username.find({}, function(err, result) {
                        if (err) {
                            return done(err);
                        }

                        var data = [{
                                day: 'Sunday',
                                names: [],
                                status: '',
                                statusBar: 0
                            },
                            {
                                day: 'Monday',
                                names: [],
                                status: '',
                                statusBar: 0
                            },
                            {
                                day: 'Tuesday',
                                names: [],
                                status: '',
                                statusBar: 0
                            },
                            {
                                day: 'Wednesday',
                                names: [],
                                status: '',
                                statusBar: 0
                            },
                            {
                                day: 'Thursday',
                                names: [],
                                status: '',
                                statusBar: 0
                            },
                            {
                                day: 'Friday',
                                names: [],
                                status: '',
                                statusBar: 0
                            },
                            {
                                day: 'Saturday',
                                names: [],
                                status: '',
                                statusBar: 0
                            },
                        ];

                        result.forEach(function(user) {
                            var userDays = user.days;
                            var userName = user.name;

                            userDays.forEach(function(element) {
                                if (element == 'monday') {
                                    var monday = data[1].names;
                                    monday.push(userName);
                                }

                                if (element == 'tuesday') {
                                    var tuesday = data[2].names;
                                    tuesday.push(userName);
                                }
                                if (element == 'wednesday') {
                                    var wednesday = data[3].names;
                                    wednesday.push(userName);
                                }
                                if (element == 'thursday') {
                                    var thursday = data[4].names;
                                    thursday.push(userName);
                                }
                                if (element == 'friday') {
                                    var friday = data[5].names;
                                    friday.push(userName);
                                }
                                if (element == 'saturday') {
                                    var saturday = data[6].names;
                                    saturday.push(userName);
                                }
                                if (element == 'sunday') {
                                    var sunday = data[0].names;
                                    sunday.push(userName);
                                }
                            });
                        });

                        for (var v = 0; v < data.length; v++) {

                            var day1 = data[v].names;
                            var statuscolor = data[v].status;
                            var bar = data[v].statusBar;

                            if (day1.length >= 3) {
                                statuscolor = 'disabled';
                                bar = 100;
                            }
                            if (day1.length == 3) {
                                bar = (day1.length /3 * 100);
                            }
                            if (day1.length < 3) {
                                bar = (day1.length /3 * 100);
                            }

                            data[v].status = statuscolor;
                            data[v].statusBar = bar;

                        }

                        console.log(data);

                        var data_2 = {
                            msg: msg,
                            myDays: dayObj,
                            sun: data[0].status,
                            mon: data[1].status,
                            tue: data[2].status,
                            wed: data[3].status,
                            thur: data[4].status,
                            fri: data[5].status,
                            sat: data[6].status,
                            sunBar: data[0].statusBar,
                            monBar: data[1].statusBar,
                            tueBar: data[2].statusBar,
                            wedBar: data[3].statusBar,
                            thurBar: data[4].statusBar,
                            friBar: data[5].statusBar,
                            satBar: data[6].statusBar,
                            sunAvil: data[0].names.length,
                            monAvil: data[1].names.length,
                            tueAvil: data[2].names.length,
                            wedAvil: data[3].names.length,
                            thurAvil: data[4].names.length,
                            friAvil: data[5].names.length,
                            satAvil: data[6].names.length,
                        };

                        res.render('waiters', data_2);
                    });

                }
            });

        } else {
            res.redirect('/login');
        }
    };

    const reset = function(req, res, done) {
        models.Username.find({}, function(err, users) {
            if (err) {
                return done(err);
            }

            for (var i = 0; i < users.length; i++) {
                users[i].days = [];
                users[i].save();
            }
            res.redirect('days');
        });
    };

    const waiters = function(req, res, done) {

        var user_id = req.params.user_id;

        models.Username.findOne({
            '_id': user_id
        }, function(err, user) {

            if (err) {
                return done(err);
            }

            var waiter_days = req.body;

            if (!waiter_days.days) {
                req.flash('error', "");
                res.render('waiters');
            }

            if (waiter_days.days) {
                user.days = waiter_days.days;

                user.save(function(err, result) {
                    if (err) {
                        return done(err);
                    }
                });

                var msg = 'Hey ' + user.name + ', are you happy with the days you selected? Otherwise,';
                var selecetedDays = user.days;
                var dayObj = {};
                user.days.forEach(function(day) {
                    dayObj[day] = true;
                });

                models.Username.find({}, function(err, result) {
                    if (err) {
                        return done(err);
                    }

                    var data = [{
                            day: 'Sunday',
                            names: [],
                            status: ''
                        },
                        {
                            day: 'Monday',
                            names: [],
                            status: ''
                        },
                        {
                            day: 'Tuesday',
                            names: [],
                            status: ''
                        },
                        {
                            day: 'Wednesday',
                            names: [],
                            status: ''
                        },
                        {
                            day: 'Thursday',
                            names: [],
                            status: ''
                        },
                        {
                            day: 'Friday',
                            names: [],
                            status: ''
                        },
                        {
                            day: 'Saturday',
                            names: [],
                            status: ''
                        },
                    ];

                    result.forEach(function(user) {
                        var userDays = user.days;
                        var userName = user.name;

                        userDays.forEach(function(element) {
                            if (element == 'monday') {
                                var monday = data[1].names;
                                monday.push(userName);
                            }

                            if (element == 'tuesday') {
                                var tuesday = data[2].names;
                                tuesday.push(userName);
                            }
                            if (element == 'wednesday') {
                                var wednesday = data[3].names;
                                wednesday.push(userName);
                            }
                            if (element == 'thursday') {
                                var thursday = data[4].names;
                                thursday.push(userName);
                            }
                            if (element == 'friday') {
                                var friday = data[5].names;
                                friday.push(userName);
                            }
                            if (element == 'saturday') {
                                var saturday = data[6].names;
                                saturday.push(userName);
                            }
                            if (element == 'sunday') {
                                var sunday = data[0].names;
                                sunday.push(userName);
                            }
                        });
                    });

                    for (var v = 0; v < data.length; v++) {

                        var day1 = data[v].names;
                        var statuscolor = data[v].status;
                        var bar = data[v].statusBar;

                        if (day1.length >= 3) {
                            statuscolor = 'disabled';
                            bar = 100;
                        }
                        if (day1.length == 3) {
                            bar = (day1.length /3 * 100);
                        }
                        if (day1.length < 3) {
                            bar = (day1.length /3 * 100);
                        }

                        data[v].status = statuscolor;
                        data[v].statusBar = bar;

                    }

                    var data_2 = {
                        msg: msg,
                        myDays: dayObj,
                        sun: data[0].status,
                        mon: data[1].status,
                        tue: data[2].status,
                        wed: data[3].status,
                        thur: data[4].status,
                        fri: data[5].status,
                        sat: data[6].status,
                        sunBar: data[0].statusBar,
                        monBar: data[1].statusBar,
                        tueBar: data[2].statusBar,
                        wedBar: data[3].statusBar,
                        thurBar: data[4].statusBar,
                        friBar: data[5].statusBar,
                        satBar: data[6].statusBar,
                        sunAvil: data[0].names.length,
                        monAvil: data[1].names.length,
                        tueAvil: data[2].names.length,
                        wedAvil: data[3].names.length,
                        thurAvil: data[4].names.length,
                        friAvil: data[5].names.length,
                        satAvil: data[6].names.length,
                    };


                    res.render('waiters', data_2);
                });
            }
        });
    };

    const days = function(req, res, done) {
        //Check if the user is still logged in
        if (req.session && req.session.user) {
            // Check if the user is an admin
            if (req.session.user.username == 'admin') {
                models.Username.find({}, function(err, result) {
                    if (err) {
                        return done(err);
                    }

                    var data = [{
                        day: 'Sunday',
                        names: [],
                        status: '',
                        statusBar: 0
                    },
                    {
                        day: 'Monday',
                        names: [],
                        status: '',
                        statusBar: 0
                    },
                    {
                        day: 'Tuesday',
                        names: [],
                        status: '',
                        statusBar: 0
                    },
                    {
                        day: 'Wednesday',
                        names: [],
                        status: '',
                        statusBar: 0
                    },
                    {
                        day: 'Thursday',
                        names: [],
                        status: '',
                        statusBar: 0
                    },
                    {
                        day: 'Friday',
                        names: [],
                        status: '',
                        statusBar: 0
                    },
                    {
                        day: 'Saturday',
                        names: [],
                        status: '',
                        statusBar: 0
                    },
                ];

                result.forEach(function(user) {
                    var userDays = user.days;
                    var userName = user.name;

                    userDays.forEach(function(element) {
                        if (element == 'monday') {
                            var monday = data[1].names;
                            monday.push(userName);
                        }

                        if (element == 'tuesday') {
                            var tuesday = data[2].names;
                            tuesday.push(userName);
                        }
                        if (element == 'wednesday') {
                            var wednesday = data[3].names;
                            wednesday.push(userName);
                        }
                        if (element == 'thursday') {
                            var thursday = data[4].names;
                            thursday.push(userName);
                        }
                        if (element == 'friday') {
                            var friday = data[5].names;
                            friday.push(userName);
                        }
                        if (element == 'saturday') {
                            var saturday = data[6].names;
                            saturday.push(userName);
                        }
                        if (element == 'sunday') {
                            var sunday = data[0].names;
                            sunday.push(userName);
                        }
                    });
                });

                for (var v = 0; v < data.length; v++) {

                    var day1 = data[v].names;
                    var statuscolor = data[v].status;
                    var bar = data[v].statusBar;

                    if (day1.length < 3) {
                        statuscolor = 'primary';
                        bar = (day1.length /3 * 100);

                    }

                    if (day1.length == 3) {
                        statuscolor = 'info';
                        bar = (day1.length /3 * 100);
                    }
                    if (day1.length > 3) {
                        statuscolor = 'success';
                        bar = 100;
                    }

                    data[v].status = statuscolor;
                    data[v].statusBar = bar;

                }

                console.log(data);
                res.render('days', {
                    data
                });
            });
            }
            if (req.session.user.username !== 'admin') {
                res.redirect('waiters/' + req.session.user.id);
            }
        }
        else {
            res.redirect('/login');
        }
    };

    return {
        home,
        login,
        sign_in,
        dashboard,
        reset,
        waiters,
        days
    }
}
