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
	}