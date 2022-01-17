function( status ) {
				if( status === "Success" )  {
					showPage( prevPage );
					prefs.set( 'username', username );
					prefs.set( 'password', password );
					$( "#login-status-message" ).html( mw.msg( 'login-success' ) );
					setTimeout( function() {
						$( "#login-status" ).hide();
						success();
					}, 3 * 1000 );
				} else {
					$( "#login-status-message" ).html( mw.msg( 'login-failed', status ) );
					fail( status );
				}
			}