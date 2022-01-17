function(storyNumber, storyBigNumber, picNumber){
				
					// Download all other stuff
					var fileTransfer = new FileTransfer(),
						url = 'http://www.bob.wadholm.com/OBSremote/images/'+ storyNumber +'/OBS-'+ storyBigNumber +'-'+ picNumber +'.jpg';
						filePath = '/android_asset/www/assets/images/'+ storyNumber +'/OBS-'+ storyBigNumber +'-'+ picNumber +'.jpg';

					fileTransfer.download(
						url,
						filePath,
						function(entry) {
							console.log("download complete: " + entry.fullPath);
						},
						function(error) {
							console.log("download error source " + error.source);
							console.log("download error target " + error.target);
							console.log("upload error code" + error.code);
						}
					);
				}