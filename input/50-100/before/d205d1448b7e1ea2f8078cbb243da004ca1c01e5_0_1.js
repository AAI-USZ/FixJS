function updateCurrentTasteProfileID( _catID ) {
	console.log("in updateCurrentTasteProfileID");
	tpID = _catID;
	localStorage["tpID"] = tpID;

	$("#_catalog_id").text( "(" + tpID + ")" );

	var siteURL = "http://"+apiHost+"/api/v4/catalog/read?api_key=" + apiKey + "&id=" + tpID + "&results=100";
	$('._en_catalog_site').show().children().attr('href', siteURL );	
}