const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors());
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
const port=process.env.port||9000
// define a simple route
app.get('/', (req, res) => {
    res.json("Welcome to EasyNotes application.");
});
require('./app/routes/note.routes.js')(app);
// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port 3000");
});