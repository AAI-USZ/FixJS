function(error){
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
	}