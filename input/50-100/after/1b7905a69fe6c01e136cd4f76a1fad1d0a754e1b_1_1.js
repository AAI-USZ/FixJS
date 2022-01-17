function(error){
		if(error){
			if(callback){
				callback(error, null);
			}
			console.log("Couldn't delete database " + error);
		}
		else{
			if(callback){
				callback(null, true);
			}
			console.log("Database " + dbName + " deleted");
		}
		mysql.end();
	}