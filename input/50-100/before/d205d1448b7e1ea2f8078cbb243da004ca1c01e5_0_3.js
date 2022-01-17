function(data) {
			var response = data.response;
			console.log("name is " + response.name);
			console.log("cat id is " + response.id );

			if( response.id ) {
				updateCurrentTasteProfileID( response.id );

				// add catalog-level custom data
				attachCustomAttrsToCatalog( tpID );
				
			    retrieveListOfProfiles();				
			} else {
				console.log("Error in creating new taste profile");
			}
	}