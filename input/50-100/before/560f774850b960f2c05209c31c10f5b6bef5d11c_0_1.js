function(file) {
		var ext = file.substring(file.length-3);
		if (ext == '.js') {
			var f = path.join(resourcesDir,file);
			// this method will use the AST of the code to resolve all
			// the requires in the code and filter only the ones which are 
			// alloy builtins
			var found = requires.findAllRequires(f,alloyFilter);
			_.extend(alloyLibs,found);
		}
	}