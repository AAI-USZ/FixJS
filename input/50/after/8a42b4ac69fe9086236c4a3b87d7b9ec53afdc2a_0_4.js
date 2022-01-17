function(exists) {
				if(exists === false){
					console.log("Records store doesn't exist, creating it.");
					store.save({key: "records", options: []});
				}
			}