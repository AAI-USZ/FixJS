function(err, cached_content){

				if(err){
					return callback(err, {"body": cached_content, "updated_at": stat.mtime, "options": {"header": header}});	
				}

				header["Content-Length"] = cached_content.length;

				return callback(null, {"body": cached_content, "updated_at": stat.mtime, "options": {"header": header}});
			}