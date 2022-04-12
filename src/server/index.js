var path = require('path');
const express = require('express');
const api = require('./meaningCloud.js');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express()

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('dist'))

console.log(__dirname)

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('App listening on port 8081!')
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.post('/request', async (req, res) => {
    // console.log(req.body)
    const url = req.body.url;

    try {
        const data = await api.callMeaningCloud(url, 'auto')
        // console.log(await data.body)
        res.send(await data.body).status(await data.status)
    } catch (err) {
        console.error(err)
        res.send(err).status(err.status)
    }

})

