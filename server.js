var express = require("express");
var app = express();
var bodyPasrser = require("body-parser");
var session = require("express-session");

app.use(bodyPasrser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));

app.use(session({
    secret: 'denvernuggets',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 70000 }
}))

app.get('/', function(req, res) {
    if(!req.session.page_name) { 
        req.session.name = '';
    }
    if(!req.session.location) { 
        req.session.location = '';
    }
    if(!req.session.language) { 
        req.session.language = '';
    }
    if(!req.session.comment) { 
        req.session.comment = '';
    }
    
    res.render('index');
})

app.post('/process', function(req, res) {
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;

    res.redirect('/result')
})


app.get('/result', function(req, res) {
    res.render('result', {name: req.session.name, location: req.session.location, language: req.session.language, comment: req.session.comment});
})


app.listen(8000, function() {
    console.log("server is running");
})
