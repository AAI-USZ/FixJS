function(path, content_type, last_modified, callback){
			return callback(null, {"body": "rendered output", "modified": true}); 	
		}