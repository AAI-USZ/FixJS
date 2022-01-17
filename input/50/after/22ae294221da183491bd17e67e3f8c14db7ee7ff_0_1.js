function() {
		// Use jQuery Mobile to load the new page
		psu.log('Ok. Loading the AUTH required page: ' + linkUrl);
		$.mobile.changePage( linkUrl, {
			reloadPage: "true"
		});
	}