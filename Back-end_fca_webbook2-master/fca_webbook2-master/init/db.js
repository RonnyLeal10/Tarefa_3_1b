module.exports = (app, callback) => {
    const CONFIG = require('../config/config');
    //Connect to DB
    const mongoose = require('mongoose');
    let settings = {
        reconnectTries: Number.MAX_VALUE,
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };
    global.mongoConnection = mongoose.createConnection(CONFIG.mongodb.uri, settings, (error) => {
        if (error) throw error;
        console.log("---Connected to DB");
        console.log("MongoDB URI:", CONFIG.mongodb.uri);
        console.log("Base de dados:", global.mongoConnection.name);
        console.log("Servidor:", global.mongoConnection.host);
        console.log("Porta:", global.mongoConnection.port);
        return callback();
    })

}