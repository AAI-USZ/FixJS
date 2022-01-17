function( requesterEvent, id, type, content ) {
		var errorMessage = content;
//		alert( 'MCAM.Error: ' + errorMessage );
//		mcam.logError( 'MCAM.Error: ' + errorMessage );
		mcam.log( 'MCAM.Error: ' + errorMessage );
		if( requesterEvent.failureCallback )
			requesterEvent.failureCallback();
		return true;
	}