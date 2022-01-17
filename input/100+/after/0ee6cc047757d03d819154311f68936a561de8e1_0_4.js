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
	var addedFiles = [];
	var counter = 0;
	var total = 0;

	function getFileHeaderCallback(arr, filename, folderIndex) {
		total++;
		
		return function (err, data) {
			if (err) {
				//console.log(err);
			} else {
				
				if ((merge_folders && addedFiles.indexOf(filename) === -1) || !merge_folders) {
					arr.push([filename, data.title, data.version, folderIndex]);
					if (merge_folders) {
						addedFiles.push(filename);
					}
				}
				

				
			}
			counter++;
			if (counter === total) { // All loaded

				if (merge_folders) {
					filelist.sort(alphabeticSort);
				} else {
					for (var f in filelist) {
						filelist[f].sort(alphabeticSort);
					}
				}

				callback(filelist);
			}
		};

	};

	function readdirCallback(folder, folderIndex) {
		return function (err, files) {

			if (err) {
				//console.error("Path not found/is not a directory: "+err.path);
			} else {
				
				for (var i = 0; i < files.length; i++) {
					if (validFileExtRegExp.test(files[i])) {

						if (merge_folders) {
							getFileHeader(path.join(folder, files[i]), getFileHeaderCallback(filelist, files[i], folderIndex));
						} else {
							getFileHeader(path.join(folder, files[i]), getFileHeaderCallback(filelist[folder], files[i], folderIndex));
						}
						
						
					}
					
				}
			}
			
		};
	};

	for(var i = 0; i < folders.length; i++) {
		if (!merge_folders) {
			filelist[folders[i]] = [];
		}
		
		fs.readdir(folders[i], readdirCallback(folders[i], i));
	}
}