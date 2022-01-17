function( err, textStatus ) {
				$( "#login-status-message" ).empty();
				displayError( mw.msg( 'login-failed' ), textStatus );
				fail( textStatus );
			}