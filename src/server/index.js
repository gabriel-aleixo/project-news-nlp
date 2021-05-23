var path = require('path');
const express = require('express');
const meaningCloudApi = require('./meaningCloud.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile('dist/index.html')
});

