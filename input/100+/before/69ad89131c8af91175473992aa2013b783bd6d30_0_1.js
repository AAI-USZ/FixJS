function(request_path, file_extension, body, callback){
		var self = this;

		var file_path = path.join(self.outputDir, (getBasepath(request_path) + file_extension));

		// TODO: Create directories
		fs.writeFile(file_path, body, "binary", function(err){
			return callback(err);	
		});
	}