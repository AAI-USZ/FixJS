function( error ) {
	if ( error ) {
		logger.error( "Error updating WordPress: " + error.stack );
	}
}