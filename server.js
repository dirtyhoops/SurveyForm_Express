var express = require("express");
var app = express();
var bodyPasrser = require("body-parser");

app.use(bodyPasrser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));


app.get('/', function(req, res) {
    res.render('index');
})

app.post('/process', function(req, res) {
    res.render('result', {name: req.body.name, location: req.body.location, language: req.body.language, comment: req.body.comment})
})

app.listen(8000, function() {
    console.log("server is running");
})
