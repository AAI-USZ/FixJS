function( error ) {
	if ( error ) {
		logger.error( "Error during retry: " + error.stack );
	}
}