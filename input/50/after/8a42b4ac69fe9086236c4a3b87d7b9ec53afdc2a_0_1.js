function(exists) {
				if(exists === false){
					console.log("Employees store doesn't exist, creating it.");
					store.save({key: "employees", options: []});
				}
			}