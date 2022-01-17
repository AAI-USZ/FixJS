function(error){
		if(error){
			console.log("Couldn't delete database " + error);
		}
		else{
			if(callback){
				callback();
			}
			console.log("Database " + dbName + " deleted");
		}
		mysql.end();
	}