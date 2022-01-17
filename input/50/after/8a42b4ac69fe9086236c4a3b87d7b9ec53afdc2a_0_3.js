function(exists) {
				if(exists === false){
					console.log("Studies store doesn't exist, creating it.");
					store.save({key: "studies", options: {}});
				}
			}