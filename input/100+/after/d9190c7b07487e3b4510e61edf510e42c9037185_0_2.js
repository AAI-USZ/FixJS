function(request_path, file_extension, header, callback){
		var self = this;
		var cache_obj = {"body": null, "updated_at": null, "options": {"header": header}};

		var file_path = path.join(self.outputDir, (getBasepath(request_path) + file_extension));

		fs.stat(file_path, function(err, stat){
			if(err){
				return callback(err, cache_obj);	
			}	

			fs.readFile(file_path, "binary", function(err, cached_content){

				cache_obj.body = cached_content;
				cache_obj.updated_at = stat.mtime;
				cache_obj.options.header["Content-Length"] = (cached_content && cached_content.length || 0);

				return callback(err, cache_obj);
			});
		});
	}