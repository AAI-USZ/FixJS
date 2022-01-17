function(request_path, file_extension, header, callback){
		var self = this;

		var file_path = path.join(self.outputDir, (getBasepath(request_path) + file_extension));

		fs.stat(file_path, function(err, stat){
			if(err){
				return callback(err, {"body": null, "updated_at": null, "options": {"header": header}});	
			}	

			fs.readFile(file_path, "binary", function(err, cached_content){

				if(err){
					return callback(err, {"body": cached_content, "updated_at": stat.mtime, "options": {"header": header}});	
				}

				header["Content-Length"] = cached_content.length;

				return callback(null, {"body": cached_content, "updated_at": stat.mtime, "options": {"header": header}});
			});
		});
	}