function( err, textStatus ) {
				$( "#login-status-message" ).html( mw.msg( 'login-failed', textStatus ) );
				fail( textStatus );
			}