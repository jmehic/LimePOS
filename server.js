var http = require("http"),
    databaseURL = "coconut_db",
    collections = ["users", "inventory"],
    db = require("mongojs").connect(databaseURL, collections);

http.createServer(function(request, response){
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello server");
    response.end();
}).listen(8080);

function addUser(name, email, password){
    db.users.save({username: name, user_email: email, user_password: password}, function(err, saved){
        if( err || !saved )
            console.log("User not saved");
        else
            console.log("User saved");
    });
};

function updateUser(user, email, password){
    if( db.users.find({name: user}, function(err, users){
        if( err || !users )
            console.log("User not found");
        else{
            db.users.update({name: user}, {$set: {user_email: email, user_password: password}}, function(err, updated){
                if( err || !updated )
                    console.log("User not updated");
                else
                    console.log("User updated");
            });
        }
    }));
};
