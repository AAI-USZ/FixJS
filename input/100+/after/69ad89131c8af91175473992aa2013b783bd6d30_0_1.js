function(request_path, file_extension, body, callback){
		var self = this;

		var file_path = path.join(self.outputDir, (getBasepath(request_path) + file_extension));

		var dir_path_portions = path.dirname(file_path).split(path.sep || "/");

		var checkAndCreateDir = function(dirpath){
			fs.stat(dirpath, function(err, stat){
				if(err || !stat.isDirectory()){
					fs.mkdir(dirpath, function(err){
						if(err){
							throw err;				
						}

						return checkAndCreateDirCallback(dirpath);
					});	
				} else {
					return checkAndCreateDirCallback(dirpath);
				}
			});	
		}

		var checkAndCreateDirCallback = function(current_path){
			if(dir_path_portions.length){
				var next_dirpath = path.join(current_path, dir_path_portions.shift());	
				return checkAndCreateDir(next_dirpath);
			} else {
				fs.writeFile(file_path, body, "binary", function(err){
					return callback(err);	
				});	
			}
		}
		checkAndCreateDirCallback("");
		
	}