function getFileList(merge_folders, callback) {
	var folders = settings.paths.folders;

	if (merge_folders) {
		var filelist = [];
	} else {
		var filelist = {};
	}
	
	if (folders.length === 0) {
		callback(filelist);
	}

	var counter = 0;

	function readdirCallback(folder) {
		return function (err, files) {
			if (err) {
				//console.error("Path not found/is not a directory: "+err.path);
			} else {
				for (var i = 0; i < files.length; i++) {
					if (validFileExtRegExp.test(files[i])) {
						if (merge_folders && filelist.indexOf(files[i]) === -1) {
							filelist.push(files[i]);
						} else if (!merge_folders) {
							filelist[folder].push(files[i]);
						}
					}
					
				}
			}
			
			counter++;
			if (counter === folders.length) { // All loaded
				callback(filelist);
			}
		};
	};

	for(var i = 0; i < folders.length; i++) {
		if (!merge_folders) {
			filelist[folders[i]] = [];
		}
		
		fs.readdir(folders[i], readdirCallback(folders[i]));
	}
}