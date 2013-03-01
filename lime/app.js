
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , db_url = "coconut"
  , collections = ["users"]
  , db = require('mongojs').connect(db_url, collections);

  //, db = require('mongodb').db
  //, db_connection = require('mongodb').connection
  //, db_server = require('mongodb').server;

//var host = process.env['MONGO_NODE_DRIVER_HOST'] !== null ?
//            process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
//var port = process.env['MONGO_NODE_DRIVER_HOST'] !== null ?
//            process.env['MONGO_NODE_DRIVER_HOST'] : db_connection.DEFAULT_PORT;

var app = express();

//function runQuery( db, query, nextFn ){
  //  db.open( function( err, db ){
    //    db.collection( myCollection, function( err, collection ){
      //      collection.find( query, function( err, cursor ){
        //        cursor.toArray( function( err, docs ){
          //          console.log("Found " + docs.length + " documents");
            //        var queryResults = [];
              //      for( var i = 0; i < docs.length; i ++ ){
                //        queryResults[queryResults.length] = docs[i];
                  //  }
                    //db.close();
                    //nextFn(queryResults);
                //});
            //});
        //});
    //});
//};

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  //app.engine('html', require('ejs').renderFile);
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
  db.users.insert(req.body);
  res.render('database.ejs', { title: 'Lime - Database Demo'});
});
app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
