function displayError( heading, text ) {
		showPage( 'error-page' );
		$( '#error-msg' ).html( heading + ':<br>' + text );
	}