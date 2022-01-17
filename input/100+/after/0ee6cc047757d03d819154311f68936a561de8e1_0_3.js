function (err, files) {

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
			
		}