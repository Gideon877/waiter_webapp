const moment = require('moment');
const timestamp = moment.utc().toISOString();

module.exports = [
    {
        day: 'Sunday', count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Monday', count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Tuesday', count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Wednesday', count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Thursday', count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Friday', count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
    {
        day: 'Saturday', count: 0, status: '', waiters: [], timestamp: {
            created: timestamp,
            lastUpdated: timestamp
        }
    },
]