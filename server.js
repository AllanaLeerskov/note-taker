const express = require('express');
const fs = require('fs');

//init
const app = express();
const PORT = process.env.PORT || 3002;

//express json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//routes file requirement
require('./Develop/routes/routes')(app);

//listener
app.listen(PORT, function() {
    console.log(`API server now on port ${PORT}!`);
})