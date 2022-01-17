function(dbName, callback){
	var mysql   = require("mysql").createClient({
		host: config.mysqlDatabase["host"],
		user: config.mysqlDatabase["user"],
		password: config.mysqlDatabase["password"],
	});

	mysql.query('DROP DATABASE ' + dbName, function(error){
		console.log("DELETING");
		if(error){
			if(callback){
				callback(0);
			}
			console.log("Couldn't delete database " + error);
		}
		else{
			if(callback){
				callback(1);
			}
			console.log("Database " + dbName + " deleted");
		}
		mysql.end();
	});
}