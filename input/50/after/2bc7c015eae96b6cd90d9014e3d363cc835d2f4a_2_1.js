function( path, contents, flow ){
		
	var processed = coffeescript.compile( contents );
	
	return processed;

}