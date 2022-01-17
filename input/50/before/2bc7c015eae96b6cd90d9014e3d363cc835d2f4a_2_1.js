function( flow ){

	flow.strings.forEach( function( string, i ){
		
		var processed = coffeescript.compile( string );
		
		flow.strings[i] = processed;
		
	});

}