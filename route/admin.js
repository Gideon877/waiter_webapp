"use strict"
module.exports = function(models) {

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

    const days = (req, res, done) => {
        if (req.session && req.session.user) {
            switch (req.session.user.username) {
                case 'admin':
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

                            if (day1.length < 3) {
                                statuscolor = 'primary';
                                bar = (day1.length / 3 * 100);

                            }

                            if (day1.length == 3) {
                                statuscolor = 'info';
                                bar = (day1.length / 3 * 100);
                            }
                            if (day1.length > 3) {
                                statuscolor = 'success';
                                bar = 100;
                            }

                            data[v].status = statuscolor;
                            data[v].statusBar = bar;

                        }

                        console.log(data);
                        res.render('days', {data});
                    });
                    break;
                default:
                    res.redirect('waiters/' + req.session.user.id);
                    break
            }

        } else {
            res.redirect('/login');
        }
        /**
        Get Users, get their days
        display each user in a day they selected
        **/
    }

    return {reset, days}
}
