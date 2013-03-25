
/**
* Module dependencies.
*/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  //, db_url = "coconut"
  //, collections = ["users"]
  //, db = require('mongojs').connect(db_url, collections);

var app = express();
var db = require('./public/javascripts/database.js');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/users', user.list);

app.get('/database', function( req, res ){
    res.render('database.ejs', { title: 'Lime - Database Demo'});
});

app.post('/database', function( req, res ){
    console.log("posted");
    console.log(JSON.stringify(req.body));
    db.insertUser(req.body);
    res.redirect('/database');
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
