
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path')
	, bcrypt = require("bcrypt") //hashing algorithm
	, inventory = require('./public/javascripts/inventory.js')
	, MongoStore = require('connect-mongo')(express) //session datastore using mongodb
	, mongoose = require('mongoose') //blessed mongodb connector
	, User //User class defined below
	, Item;

//connect to the "users" database
mongoose.connect('mongodb://localhost/coconut2');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//once the DB connection is open...
db.once('open', function callback () {
	//Create a mongoose Schema (document structure)
	var userSchema = mongoose.Schema({
		username: String,
		password: String
	});

	var itemSchema = mongoose.Schema({
		item_id: Number,
		item_name: String,
		item_price: Number,
		item_quantity: Number
	});
	
	//Convert this schema into an instantiable "model" Class 
	User = mongoose.model("User", userSchema);
	Item = mongoose.model("Item", itemSchema);
});

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	
	//enable cookies
	app.use(express.cookieParser());
  
	//setup session management
  	app.use(express.session({
		cookie: {maxAge: 60000 * 20} // 20 minutes
		, secret: "superduper secret"
		, store: new MongoStore({ //use a mongo-connect store
	 	db: "sessions"
	})
	}));
	
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', function(req, res, next){
	//redirect to user page if logged in
	if(req.session.username){
		res.redirect("/account");
	}else{
		next();
	}
}, routes.index);

app.get('/users', function(req, res, next){
	//redirect home if not logged in
	if(req.session.username){
		next();
	}else{
		res.redirect("/");
	}
}, user.list);

app.get('/database', function( req, res ){
	if( req.session.username ){
		res.render('database.ejs', { title: 'Lime - Database Demo' });
	}
	else{
		res.redirect('/');
	}
});

app.get('/login', function( req, res ){
	res.render('login.ejs', { title: 'Lime - Login' });
});

app.get('/create', function( req, res ){
	res.render('create.ejs', { title: 'Lime - Create an account' });
});

app.get('/account', function( req, res ){
	res.render('account.ejs', { title: 'Lime - Your Account' });
});

app.post("/create", function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	User.find({username: username}, function(err, users){
	  	//check if the user already exists
	 	if(users.length!=0){
		 	res.redirect("/?error=user already exists");  
		 	return;
	 	}
	  	//generate a salt, with 10 rounds (2^10 iterations)
	  	bcrypt.genSalt(10, function(err, salt) {
		//hash the given password using the salt we generated
	  	bcrypt.hash(password, salt, function(err, hash) {
		//create a new instance of the mongoose User model we defined above
		var newUser = new User({
			username: username,
			password: hash
		}); 
		
		//save() is a magic function from mongoose that saves this user to our DB
		newUser.save(function(err, newUser){
			//res.send("successfully created user: "+newUser.username);
			res.redirect('/account');
		});    
	  });
	  });   
	}); 
});

app.post("/login", function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	//Search the Database for a User with the given username
	User.find({username: username}, function(err, users){
		//we couldn't find a user with that name
		if(err || users.length==0){
			res.redirect("/?error=invalid username or password");   
			return;
		}
		
		var user = users[0];
		//compare the hash we have for the user with what this password hashes to
		bcrypt.compare(password, user.password, function(err, authenticated){
			if(authenticated){
				req.session.username = user.username;
				res.redirect("/account");
			}else{
				res.redirect("/?error=invalid username or password");   
			}
		});
	});
});

app.post("/additem", function( req, res ){
	var item_id = req.body.itemid;
	var item_name = req.body.itemname;
	var price = req.body.price;
	var quantity = req.body.quantity;
	console.log(item_id +", "+item_name+", "+price+", "+quantity);

	var newItem = new Item({
		item_id: item_id,
		item_name: item_name,
		item_price: price,
		item_quantity: quantity
	});

	newItem.save(function( err, newItem ){
		res.redirect('/account');
	});
});

//originally used POST to log out, might go back to that
app.get("/logout", function(req, res){
	req.session.destroy(function(err){
	  	if(err){
			console.log("Error: %s", err);
		}
		res.redirect("/");
	});   
});

app.get("/inventory", function( req, res ){
	var itemCount;
	var itemArray = [];

	var printCount = function(){
		console.log(itemCount);
	};

	var buildInventory = function(){
		for(var i = 1; i <= itemCount; i++){
			Item.findOne({ 'item_id': i }, 'item_id item_name item_price item_quantity', function( err, item ){
				itemArray.push(item);
				itemArray.reverse();
				console.log(item);
			});
		};
		return itemArray;
	};

	Item.count({}, function( err, count ){
		itemCount = count;
		printCount();
		buildInventory();
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});