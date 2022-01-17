function (err, data) {
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
		}