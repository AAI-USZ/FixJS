function($) {
	    var filepath = decodeURIComponent($);
        if ( fs.stat(filepath).isFile() ) {
            filePaths.push(filepath);
        }
        else {
            filePaths = filePaths.concat(fs.ls(filepath, depth));
		}
	}