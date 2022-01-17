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
					var errMsg;
					// handle login API errors
					// http://www.mediawiki.org/wiki/API:Login#Errors
					switch( status ) {
						case 'NoName': // lgname param not set
						case 'Illegal': // an illegal username was provided
						case 'NotExists': // username does not exist
							errMsg = "There was something wrong with the username you entered. Please try again.";
							break;
						case 'EmptyPass': // didn't set the lgpass param
						case 'WrongPass': // password is incorrect
						case 'WrongPluginPass': // auth plugin (not MW) rejected pw
							errMsg = "There was something wrong with the password you provided. Please try again.";
							break;
						case 'CreateBlocked': // IP address blocked from account creation
						case 'Blocked': // User is blocked
							errMsg = "The user account you are attempting to use has been blocked. Please view http://en.wikipedia.org/wiki/Wikipedia:Blocking_policy for more info.";
							break;
						case 'Throttled': // Attempting to login too many times in a short time
							errMsg = "You have attempted to log in too many times in a short period of time. Please wait a litlte while and try again.";
							break;
						case 'mustbeposted': // login module requires a 'post' request
						case 'NeedToken': // login token/session cookie missing
							errMsg = "There was an internal error. Please try again in a little while. If the problem persists, please contact us.";
							break;
						default:
							errMsg = "There was an error during your login attempt. Please try again.";
							break;
					}
					//$( "#login-status-message" ).html( mw.msg( 'login-failed', status ) );
					displayError( mw.msg( 'login-failed' ), errMsg );
					fail( status );
				}
			}