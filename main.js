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

                models.Username.findOne({
                    username: req.body.username,
                    password: req.body.password
                }, function(err, user) {

                    if (err) {
                        return done(err)
                    }

                    if (user.username == 'admin') {
                        res.redirect('days');
                    }

                    if (user.username !== 'admin') {
                        res.redirect('waiters/' + user.id)
                    }

                    if (!user || user == null) {
                        req.flash('error', 'Wrong password or username!!');
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
                return done(err);
            }


            var waiter_days = req.body
            console.log(waiter_days);

            if (!waiter_days.days) {
                req.flash('error', "");
                res.render('waiters');
            }

            if (waiter_days.days) {
                user.days = waiter_days.days;

                user.save(function(err, result) {
                    if (err) {
                        return done(err)
                    };
                });

                var msg = user.name + ', are you happy with your choice? If not,';
                var selecetedDays = user.days;
                var dayObj = {}
                user.days.forEach(function(day) {
                    dayObj[day] = true
                })

                var data = {
                    msg: msg,
                    myDays: dayObj,
                }


                res.render('waiters', data);
            }
        });
    };

    const waitersHP = function(req, res, done) {
        var user_id = req.params.user_id;

        models.Username.findOne({
            '_id': user_id
        }, function(err, user) {

            if (err) {
                return done(err);
            }

            var msg = 'Hello, ' + user.name + '.';
            var dayObj = {}
            user.days.forEach(function(day) {
                dayObj[day] = true
            })

            //------------------------------------------------------

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
                ]

                for (var i = 0; i < result.length; i++) {
                    var userDays = result[i].days;
                    var userName = result[i].name;

                    for (var a = 0; a < userDays.length; a++) {

                        if (userDays[a] == 'monday') {
                            var monday = data[1].names;
                            monday.push(userName)
                        }

                        if (userDays[a] == 'tuesday') {
                            var tuesday = data[2].names;
                            tuesday.push(userName)
                        }
                        if (userDays[a] == 'wednesday') {
                            var wednesday = data[3].names;
                            wednesday.push(userName)
                        }
                        if (userDays[a] == 'thursday') {
                            var thursday = data[4].names;
                            thursday.push(userName)
                        }
                        if (userDays[a] == 'friday') {
                            var friday = data[5].names;
                            friday.push(userName)
                        }
                        if (userDays[a] == 'saturday') {
                            var saturday = data[6].names;
                            saturday.push(userName)
                        }
                        if (userDays[a] == 'sunday') {
                            var sunday = data[0].names;
                            sunday.push(userName)
                        }
                    }
                }

                for (var v = 0; v < data.length; v++) {

                    var day1 = data[v].names;
                    var statuscolor = data[v].status

                    if (day1.length > 3) {
                        statuscolor = 'checked';
                    }

                    data[v].status = statuscolor

                }
                console.log(data);
                // res.render('waiters', data);
            })
//----------------------------------------------
            var data_2 = {
                msg: msg,
                myDays: dayObj,
                // status:
            }

            res.render('waiters', data_2)

        });
    }

    const days = function(req, res, done) {

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
            ]

            for (var i = 0; i < result.length; i++) {
                var userDays = result[i].days;
                var userName = result[i].name;

                for (var a = 0; a < userDays.length; a++) {

                    if (userDays[a] == 'monday') {
                        var monday = data[1].names;
                        monday.push(userName)
                    }

                    if (userDays[a] == 'tuesday') {
                        var tuesday = data[2].names;
                        tuesday.push(userName)
                    }
                    if (userDays[a] == 'wednesday') {
                        var wednesday = data[3].names;
                        wednesday.push(userName)
                    }
                    if (userDays[a] == 'thursday') {
                        var thursday = data[4].names;
                        thursday.push(userName)
                    }
                    if (userDays[a] == 'friday') {
                        var friday = data[5].names;
                        friday.push(userName)
                    }
                    if (userDays[a] == 'saturday') {
                        var saturday = data[6].names;
                        saturday.push(userName)
                    }
                    if (userDays[a] == 'sunday') {
                        var sunday = data[0].names;
                        sunday.push(userName)
                    }
                }
            }

            for (var v = 0; v < data.length; v++) {

                var day1 = data[v].names;
                var statuscolor = data[v].status

                if (day1.length < 3) {
                    statuscolor = 'default';
                }

                if (day1.length == 3) {
                    statuscolor = 'enough';
                }
                if (day1.length > 3) {
                    statuscolor = 'primary';
                }

                data[v].status = statuscolor

            }

            res.render('days', {
                data
            });
        });
    }

    const reset = function(req, res, done) {

        models.Username.find({}, function(err, users) {
            if (err) {
                return done(err);
            }

            for (var i = 0; i < users.length; i++) {
                var shift = users[i]
                shift.days = [];
                console.log('shift', shift);

                shift.save(function(err, result) {
                    if (err) {
                        return done(err)
                    };
                });
            }

            res.redirect('days');
        });
    }

    return {
        login,
        waiters,
        home,
        days,
        reset,
        waitersHP
    };
};
