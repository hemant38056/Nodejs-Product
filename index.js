const express = require('express');
const app = express();
const myrouter = require('./route');
const path = require('path');
const port = 1997;
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({extended : true}));
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended : false})); // express to set the body parser

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use('/', myrouter);

app.listen(port, () => {
    console.log(`click here http://localhost:${port}`)
})