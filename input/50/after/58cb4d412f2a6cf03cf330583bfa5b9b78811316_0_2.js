function(filename){
			if(Path.extname(filename) === '.js'){
				files.push(Path.join(basePath, folder, filename));
			}
		}