function (data) {
		var twitterNames = getTwitterNames(), i = 0, currentUser = {};

		// Clear our timeout token
		clearTimeout(jsonpTimeoutToken);

		// Default to 0 (AKA false - but conserving space)
		twitterNames[username] = 0;

		// Loop through user items. If twitter doesn't return an array, we will error out
		try {
			if (data && data.length) {
				for (i = 0; i < data.length; i++) {
					currentUser = data[i];
					if (currentUser.hasOwnProperty('screen_name') && currentUser.screen_name.toLowerCase() === username.toLowerCase()) {
						twitterNames[username] = 1;
					}
				}
			}
		} catch (err) {}

		SKRATCHDOT.setItem('twitterNames', twitterNames);
		populateTwitterSection();
	}