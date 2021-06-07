const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;

const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const connect = () => {
    if (NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(MONGO_URL, {
        dbName: 'gifchat',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('Failed to connect', error);
        } else {
            console.log('Connection success');
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.log('Failed to connect', error);
});
mongoose.connection.on('disconnected', () => {
    console.error('Reconnecting...');
    connect();
});

module.exports = connect;