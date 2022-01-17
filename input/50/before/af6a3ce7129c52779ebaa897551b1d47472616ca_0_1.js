function(e) {
	if (e.success)
		user = e.users[0];
		
	loadingIndicator.hide();
}