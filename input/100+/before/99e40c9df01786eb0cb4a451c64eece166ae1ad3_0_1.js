function(storyNumber, storyBigNumber, picNumber){
				
					window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotPath, 
noFileSystem); 	
					function noFileSystem(){
						console.log('bummer');
					}
				
					var storyNum = $(this).attr('rel'),
						storyNumber = storyNum.replace('story','');
						storyBigNumber = (storyNumber);
					
					 function gotPath(fileSystem) { 
						console.log(fileSystem.name); 
						console.log(fileSystem.root.name); 
						// Get the data directory, creating it if it doesn't exist.
						dataDir = fileSystem.root.getDirectory("data/OBS", {create:true},onSuccessTest, onFailTest); 
					}  
				 	// called when directory has been succesful got or created 
					function onSuccessTest(parent){ 
							console.log("Parent Name: " + parent.name); 
							// file creation 
						 lockFile = parent.getFile('OBS-'+ storyBigNumber +'-'+ picNumber +'.jpg', {create: true}, succ, failCF); 
				
					} 

					// called when file has been successfully created 
					function succ(file){ 
						console.log("toto"+ file.fullPath); 
						// in order to remove the "file:/" start 
						filePath=file.fullPath.substr(6); 
						console.log(filePath); 
						 var fileTransfer = new FileTransfer(); 
							url = url = 'http://www.bob.wadholm.com/OBSremote/images/'+ storyNumber +'/OBS-'+ storyBigNumber +'-'+ picNumber +'.jpg'; 
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
				
					function failCF(){ 
							console.log("File creation error"); 
					} 
				
					function onFailTest(){ 
							console.log("Error message"); 
					} 
					
					// Download all other stuff
					/*var fileTransfer = new FileTransfer(),
						url = 'http://www.bob.wadholm.com/OBSremote/images/'+ storyNumber +'/OBS-'+ storyBigNumber +'-'+ picNumber +'.jpg';
						filePath = 'android_asset/www/assets/images/'+ storyNumber +'/OBS-'+ storyBigNumber +'-'+ picNumber +'.jpg';

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
					);*/
				}