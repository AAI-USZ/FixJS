function () {
		Application.isLoggedIn(false);
		Application.user({});
		$.cookie('userdata', null);

		return false;
	}