var db_url = "coconut"
  , collections = ["users"]
  , db = require('mongojs').connect(db_url, collections);

//exports.displayUsers = function(){
    //var userCount = db.users.count();
    //alert("User count: " + "not working yet");//userCount);
//};

function displayUsers(){
    var userCount = db.users.count();
    alert(userCount);
};

exports.insertUser = function(insert_obj){
    db.users.insert(insert_obj);
};

//exports.db = db;
