function( err, textStatus ) {
				displayError( ms.msg( 'login-failed' ), textStatus );
				$( "#login-status-message" ).html( '' );
				fail( textStatus );
			}