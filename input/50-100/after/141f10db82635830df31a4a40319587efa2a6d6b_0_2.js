function displayError( heading, text ) {
		showPage( 'error-page' );
		var info = $( '.error-information' ).empty()[ 0 ];
		$( '<h3 />' ).text( heading ).appendTo( info );
		$( '<p />' ).text( text ).appendTo( info );
	}