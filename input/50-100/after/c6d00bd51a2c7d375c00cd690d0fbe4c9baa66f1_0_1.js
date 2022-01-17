function( message, file, line ) {
	if ( QUnit.config.current ) {
		QUnit.pushFailure( message, file + ":" + line );
	} else {
		QUnit.test( "global failure", function() {
			QUnit.pushFailure( message, file + ":" + line );
		});
	}
}