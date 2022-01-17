function($) {
        if ( fs.stat($).isFile() ) {
            filePaths.push($);
        }
        else {
		    filePaths = filePaths.concat(fs.ls($, depth));
		}
	}