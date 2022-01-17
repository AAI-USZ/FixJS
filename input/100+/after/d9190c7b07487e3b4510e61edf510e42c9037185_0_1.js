function(err, stat){
			if(err){
				return callback(err, cache_obj);	
			}	

			fs.readFile(file_path, "binary", function(err, cached_content){

				cache_obj.body = cached_content;
				cache_obj.updated_at = stat.mtime;
				cache_obj.options.header["Content-Length"] = (cached_content && cached_content.length || 0);

				return callback(err, cache_obj);
			});
		}