'use strict'

const BCryptRounds = 15;

const UserTypes = {
    Waiter: 'WAITER',
    Admin: 'ADMIN'
};

const UserData = {}

const Days = [{
    day: 'Sunday',
    names: ['King', 'admin'],
    status: '',
    statusBar: 0,
    class: 'green',
    state: 'green',
    checkmark: '',
    space: 0,
    statusBtn: ''
},
{
    day: 'Monday',
    names: [],
    status: '',
    statusBar: 0,
    class: '',
    state: '',
    checkmark: '',
    space: 0,
    statusBtn: ''
},
{
    day: 'Tuesday',
    names: [],
    status: '',
    statusBar: 0,
    class: '',
    state: '',
    checkmark: '',
    space: 0,
    statusBtn: 'checked'
},
{
    day: 'Wednesday',
    names: [],
    status: '',
    statusBar: 0,
    class: '',
    state: '',
    checkmark: '',
    space: 0,
    statusBtn: ''
},
{
    day: 'Thursday',
    names: [],
    status: '',
    statusBar: 0,
    class: '',
    state: '',
    checkmark: '',
    space: 0,
    statusBtn: 'checked'
},
{
    day: 'Friday',
    names: [],
    status: '',
    statusBar: 0,
    class: 'positive',
    state: '',
    checkmark: '',
    space: 0,
    statusBtn: 'checked'
},
{
    day: 'Saturday',
    names: [],
    status: '',
    statusBar: 0,
    class: '',
    state: '',
    checkmark: '',
    space: 0,
    statusBtn: ''
},
];


module.exports = {
    UserTypes,
    BCryptRounds,
    UserData,
    Days
}