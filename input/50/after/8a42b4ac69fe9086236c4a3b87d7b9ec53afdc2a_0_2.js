function(exists) {
				if(exists === false){
					console.log("Activities store doesn't exist, creating it.");
					store.save({key: "activities", options: {}});
				}
			}