const UserTypes = {
    Admin: 'ADMIN',
    Waiter: 'WAITER',
    Dev: 'DEVELOPER'
}

const ConnectionStatus = {
    Connected: 'CONNECTED',
    Rejected: 'REJECTED',
    Pending: 'PENDING',
    NotConnected: 'NOT_CONNECTED'
}

const RegEx = {
     'Email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}
module.exports = {
    UserTypes,
    RegEx,
    ConnectionStatus
}