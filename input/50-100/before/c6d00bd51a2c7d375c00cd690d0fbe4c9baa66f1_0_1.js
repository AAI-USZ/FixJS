function( message, file, line ) {
	if ( QUnit.config.current ) {
		ok( false, message + ", " + file + ":" + line );
	} else {
		test( "global failure", function() {
			ok( false, message + ", " + file + ":" + line );
		});
	}
}