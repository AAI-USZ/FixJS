function createNewCatalog() {
	// create a taste profile and store the resulting Catalog ID in local storage
	
	var newName = $("#_new_cat_name").val();
	var url = "http://" + apiHost + "/api/v4/catalog/create?api_key=" + apiKey;

	$.post(url,
		{
			'type':'song',
			    'name':newName
		},
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
	})
	.error( function( ){
		console.log( "in error function");
		console.log( arguments )});
}