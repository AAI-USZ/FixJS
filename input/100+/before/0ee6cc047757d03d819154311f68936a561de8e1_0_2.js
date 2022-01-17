function (err, data) {
			if (err) {
				//console.log(err);
			} else {

				arr.push([filename, data.title, data.version, folderIndex]);
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