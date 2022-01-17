function () {
		Application.isLoggedIn(false);
		Application.user({});
		$.cookie('userId', null);
		$.cookie('sessionKey', null);

		return false;
	}