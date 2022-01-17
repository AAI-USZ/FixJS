function(event) {
	// Prevent the page from changing normally
	event.preventDefault();

	// Keep jQuery Mobile from removing the href (this was a PITA to figure out. thanks for the help @borkweb)
	event.stopImmediatePropagation();

	// Show the page loading message while we redirect
	$.mobile.showPageLoadingMsg();

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
		psu.log('Ok. Loading the AUTH required page: ' + linkUrl);
		$.mobile.changePage( linkUrl, {
			reloadPage: "true"
		});
	};

	// If we're already logged in
	if (authStatus === true) {
		// Let's just load the page
		continueLoading();
	}
	// Otherwise, we need to log in... its required
	else {
		// Let's setup our redirect url
		var redirectUrl = BASE_URL + '/' + linkUrl;

		// So let's load the login page
		window.location.href = LOGIN_URL + '?redirect_to=' + redirectUrl + '&came_from=' + document.URL;
	}
}