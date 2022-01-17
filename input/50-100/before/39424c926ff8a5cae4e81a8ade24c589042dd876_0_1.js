function gotPath(fileSystem) { 
						console.log(fileSystem.name); 
						console.log(fileSystem.root.name); 
						// Get the data directory, creating it if it doesn't exist.
						dataDir = fileSystem.root.getDirectory("data/OBS", {create:true},onSuccessTest, onFailTest); 
					}