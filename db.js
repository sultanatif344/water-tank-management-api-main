const config = require('../nodemon.json');
const mongoose = require('mongoose');
// const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(config.env.MONGODB_URI+config.env.MONGO_ATLAS_PW+'@cluster0.xzqr6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../api/models/user'),
    Tank:require('../api/models/tank')
}