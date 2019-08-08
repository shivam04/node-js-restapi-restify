const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

//create server
const server = restify.createServer();

//middleware
server.use(restify.plugins.bodyParser);

//listen connection
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true }); //to avoid warning  useNewUrlParser:true
});

//initialize db variable

const db = mongoose.connection;
db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/customers')(server); //use server to create routes
    console.log(`Server started on port ${config.PORT}`);
});