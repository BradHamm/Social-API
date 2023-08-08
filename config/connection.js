const { connect, connection } = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || 'mongolinkhere';

connect(connectionString);

module.exports = connection;