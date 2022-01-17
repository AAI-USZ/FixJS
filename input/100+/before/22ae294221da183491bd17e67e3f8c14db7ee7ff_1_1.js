function(event) {
			// Prevent the page from changing normally
			event.preventDefault();

			// jQuery selector and class
			var $htmlTag = $('html');
			var authClass = 'authenticated';

			// Let's grab the link's URL
			var linkUrl = $(this).attr('href');

			// Are we already authenticated?
			var authStatus = $htmlTag.hasClass(authClass);

			// Let's create a function to continue loading the page at the originally intended URL
			var continueLoading = function() {
				// Use jQuery Mobile to load the new page
				$.mobile.changePage( linkUrl, {
					reloadPage: "true"
				});
			};

			// Function to run on a successful login
			var loginSuccess = function() {
				// Log the information
				psu.log('The user is has logged in!');

				// Close the childBrowser
				psu.log('ChildBrowser closing. We don\'t need it open anymore.');
				childBrowser.close();

				// Add a class to the html, so we don't have to worry about using the childBrowser while the user's session is still alive
				$htmlTag.addClass(authClass);

				// Let's load the page that required login/authentication
				continueLoading();
			};

			// If we're already logged in
			if (authStatus === true) {
				// Let's just load the page
				continueLoading();
			}
			// Otherwise, we need to log in... its required
			else {
				// Let's make sure that the ChildBrowser plugin is ready and available
				if (childBrowser !== null) {
					// Ok, let's load our authentication page
					childBrowser.showWebPage( LOGIN_URL, { showLocationBar: true });

					// Let's setup a function to run when the child browser is closed
					childBrowser.onLocationChange = function(location) {
						// Log the information
						psu.log('ChildBrowser location changed to: ' + location);

						// Let's check if the user has logged in successfully
						if (/login_success/.test(location)) {
							loginSuccess();
						}
					};
				}
			}
		}