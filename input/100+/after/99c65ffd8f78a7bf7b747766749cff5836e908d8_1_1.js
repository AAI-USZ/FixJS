function displayError( heading, text ) {
		showPage( 'error-page' );
		$( '#error-page textarea' ).val( heading + ':\n' + text );
	}