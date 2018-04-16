"use strict"
module.exports = function(models) {
    const dashboard = function(req, res, done) {
        var userId = req.params.userId;

        if (req.session && req.session.user) {
            models.Username.findOne({
                '_id': userId
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

                        var data = [
                            {
                                day: 'Sunday',
                                names: [],
                                status: '',
                                statusBar: 0
                            }, {
                                day: 'Monday',
                                names: [],
                                status: '',
                                statusBar: 0
                            }, {
                                day: 'Tuesday',
                                names: [],
                                status: '',
                                statusBar: 0
                            }, {
                                day: 'Wednesday',
                                names: [],
                                status: '',
                                statusBar: 0
                            }, {
                                day: 'Thursday',
                                names: [],
                                status: '',
                                statusBar: 0
                            }, {
                                day: 'Friday',
                                names: [],
                                status: '',
                                statusBar: 0
                            }, {
                                day: 'Saturday',
                                names: [],
                                status: '',
                                statusBar: 0
                            }
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
                                bar = (day1.length / 3 * 100);
                            }
                            if (day1.length < 3) {
                                bar = (day1.length / 3 * 100);
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
                            satAvil: data[6].names.length
                        };

                        res.render('waiters', data_2);
                    });

                }
            });

        } else {
            res.redirect('/login');
        }
    };
    const waiters = function(req, res, done) {

        var userId = req.params.userId;

        models.Username.findOne({
            '_id': userId
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

                    var data = [
                        {
                            day: 'Sunday',
                            names: [],
                            status: ''
                        }, {
                            day: 'Monday',
                            names: [],
                            status: ''
                        }, {
                            day: 'Tuesday',
                            names: [],
                            status: ''
                        }, {
                            day: 'Wednesday',
                            names: [],
                            status: ''
                        }, {
                            day: 'Thursday',
                            names: [],
                            status: ''
                        }, {
                            day: 'Friday',
                            names: [],
                            status: ''
                        }, {
                            day: 'Saturday',
                            names: [],
                            status: ''
                        }
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
                            bar = (day1.length / 3 * 100);
                        }
                        if (day1.length < 3) {
                            bar = (day1.length / 3 * 100);
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
                        satAvil: data[6].names.length
                    };

                    res.render('waiters', data_2);
                });
            }
        });
    };

    return {dashboard, waiters}
}
