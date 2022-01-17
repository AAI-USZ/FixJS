function( err, textStatus ) {
				$( "#login-status-message" ).html( '' );
				displayError( mw.msg( 'login-failed' ), textStatus );
				fail( textStatus );
			}