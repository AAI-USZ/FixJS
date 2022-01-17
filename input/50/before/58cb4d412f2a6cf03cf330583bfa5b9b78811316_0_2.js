function(filename){
			if(Path.extname(filename) === '.js'){
				files.push(Path.join(JS_COVERAGE_BASE, folder, filename));
			}
		}