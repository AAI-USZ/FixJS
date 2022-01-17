function(dirpath, callback){
			return callback(null, {"isDirectory": function(){ return true }});
		}