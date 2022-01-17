function createNewCatalog() {
	console.log( "in createNewCatalog");
	// create a taste profile and store the resulting Catalog ID in local storage
	
	var newName = $("#_new_cat_name").val();
	console.log("catalog name to use is " + newName );
	var url = "http://" + apiHost + "/api/v4/catalog/create?api_key=" + apiKey;

	$.post(url,
		{
			'type':'song',
			    'name':newName
		},
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
	})
	.success( function() { console.log( "in success function")})
	.error( function( ){
		console.log( "in error function");
		console.log( arguments )});
}