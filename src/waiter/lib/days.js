const moment = require('moment');
const timestamp = moment.utc().toISOString();

module.exports = [
    {
        day: 'Sunday', uniqueId: 1, count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Monday', uniqueId: 2, count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Tuesday', uniqueId: 3, count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Wednesday', uniqueId: 4, count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Thursday', uniqueId: 5, count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Friday', uniqueId: 6, count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Saturday', uniqueId: 7, count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
]