function(location) {
						// Log the information
						psu.log('ChildBrowser location changed to: ' + location);

						// Let's check if the user has logged in successfully
						if (/login-success/.test(location)) {
							loginSuccess();
						}
					}