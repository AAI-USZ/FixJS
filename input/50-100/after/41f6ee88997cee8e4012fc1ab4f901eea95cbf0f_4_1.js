function () {
	ko.applyBindings(Application);

	// Fetch logged in user
	var userId = $.cookie('userId');
	var sessionKey = $.cookie('sessionKey');
	if (sessionKey != null && userId != null) {
		Application.UpdateUserInfo(userId, sessionKey);
	}

	// Remove closed alerts from the Application.alerts array
	$('#alertsContainer .alert').live('closed', function () {
		Application.alerts.remove(ko.dataFor(this));
	});
}