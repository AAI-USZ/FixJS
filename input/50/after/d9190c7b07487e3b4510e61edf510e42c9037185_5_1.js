function(path, content_type, last_modified, options, callback){
			return callback(null, {"body": "rendered output", "modified": true}); 	
		}