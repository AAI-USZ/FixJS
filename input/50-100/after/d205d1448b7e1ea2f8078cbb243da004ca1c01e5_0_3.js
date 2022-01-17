function(data) {
			var response = data.response;

			if( response.id ) {
				updateCurrentTasteProfileID( response.id );

				// add catalog-level custom data
				attachCustomAttrsToCatalog( tpID );
				
			    retrieveListOfProfiles();				
			} else {
				console.log("Error in creating new taste profile");
			}
	}