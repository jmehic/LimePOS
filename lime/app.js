
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, user = require('./routes/user')
	, http = require('http')
	, path = require('path')
	, bcrypt = require("bcrypt") //hashing algorithm
	, MongoStore = require('connect-mongo')(express) //session datastore using mongodb
	, mongoose = require('mongoose') //mongodb connector
	, User //User class
	, Item  //Item class
	, Stats = { //stats tracking object; not the most elegant of solutions
		itemCount: 0,
		revenueEarned: 0,
		changeG: 0,
		profitMade: 0
	};

//connect to the database
mongoose.connect('mongodb://localhost/coconut');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

//once the connection is open
db.once('open', function callback () {
	//create a mongoose schema for users
	var userSchema = mongoose.Schema({
		username: String,
		password: String
	});
	//create a mongoose schema for items
	var itemSchema = mongoose.Schema({
		item_id: Number,
		item_name: String,
		item_price: Number,
		item_quantity: Number
	});
	//Convert schemas into models
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
		, secret: "superduper secret" //cookie secret
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
	//redirect to account page if logged in
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

//get about page
app.get('/about', function( req, res ){
	res.render('about.ejs', { title: 'Lime - About' });
});

//get help page
app.get('/help', function( req, res ){
	if( req.session.username ){
		res.render('help.ejs', { title: 'Lime - Help' });
	}else{
		res.redirect("/");
	}
});

//get login page
app.get('/login', function( req, res ){
	res.render('login.ejs', { title: 'Lime - Login' });
});

//get account creation page
app.get('/create', function( req, res ){
	res.render('create.ejs', { title: 'Lime - Create an account' });
});

//get account page
app.get('/account', function( req, res ){
	//check to see if user is logged in
	if( req.session.username ){
		res.render('account.ejs', { title: 'Lime - Your Account' });
	}
	//if not logged in, redirect to index page
	else{
		res.redirect('/');
	}
});

//post method for account creation page
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
		//hash the given password using the salt generated
	  	bcrypt.hash(password, salt, function(err, hash) {
		//create a new instance of the mongoose User model
		var newUser = new User({
			username: username,
			password: hash
		}); 
		
		newUser.save(function(err, newUser){
			//once user is saved, redirect to account page
			res.redirect('/account');
		});    
	  });
	  });   
	}); 
});

//post method for login page
app.post("/login", function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	//Search the Database for a User with the given username
	User.find({username: username}, function(err, users){
		//couldn't find a user with that name
		if(err || users.length==0){
			res.redirect("/?error=invalid username or password");   
			return;
		}
		
		var user = users[0];
		//compare the hash for the user with what this password hashes to
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

//post method for inventory set up page
app.post("/additem", function( req, res ){
	//get data for required fields
	var item_id = req.body.itemid;
	var item_name = req.body.itemname;
	var price = req.body.price;
	var quantity = req.body.quantity;

	//create the new item using the Item model
	var newItem = new Item({
		item_id: item_id,
		item_name: item_name,
		item_price: price,
		item_quantity: quantity
	});

	//save item and redirect to account page
	newItem.save(function( err, newItem ){
		res.redirect('/account');
	});
});

//post method for checkout on inventory page
app.post("/checkout", function( req, res ){
	//get item ids of sold items
	var cartIds = req.body.itemsSold;
	//get stats data from client
	var itCount = parseInt(req.body.itemCount);
	var itemRevenue = parseFloat(req.body.itRevenue);
	var itemChange = parseFloat(req.body.chngGiven);
	var profit = itemRevenue - itemChange;
	//update persistent stats object
	Stats.itemCount += itCount;
	Stats.revenueEarned += itemRevenue;
	Stats.changeG += itemChange;
	Stats.profitMade += profit;
	var soldIds = [];
    var itemCounter = {}; //object to store key/value pair for item ids and how many were sold
    //loop through item ids and increment sold count for each item sold
    for(var i = 0; i < cartIds.length; i++){
        var key = cartIds[i];
        var value = cartIds[i];
        if(itemCounter[key] === undefined){
            soldIds.push(value);
            itemCounter[key] = 1;
        }
        else{
	    	itemCounter[key]++;
    	}
    }
    //update item quantity in database of each item sold
	for(var key in itemCounter){
		var count = itemCounter[key];
		Item.findOne({ item_id: key }, 'item_quantity', function( err, doc ){
			doc.item_quantity -= count;
			doc.save();
		});
	}
});

//post method for editing the inventory
app.post("/savechanges", function( req, res ){
	//get the item id of the edited item, along with new price and/or quantity
	var itemId = req.body.itemId;
	var newPrice = req.body.price;
	var newQuantity = req.body.quantity;
	//find the item based on id and update the price/quantity
	Item.findOne({ item_id: itemId }, 'item_price item_quantity', function( err, doc ){
		doc.item_price = newPrice;
		doc.item_quantity = newQuantity;
		doc.save();
	});
});

//get method to log out
app.get("/logout", function(req, res){
	req.session.destroy(function(err){
	  	if(err){
			console.log("Error: %s", err);
		}
		res.redirect("/");
	});   
});

//get method for the inventory; retrieves inventory from Item model and returns to client
app.get("/inventory", function( req, res ){
	var itemArray;
	//find all values of each document in Item model and send to client
	Item.find({}, 'item_id item_name item_price item_quantity', function( err, docs ){
		itemArray = docs;
		res.send(itemArray);
	});
});

//get method for stats
app.get("/stats", function( req, res ){
	res.send(Stats);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
