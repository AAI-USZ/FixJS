function closeThisWindow() {
	/*
	 * This event is caught by login.js and results in closing the tabGroup that contains
	 * this window.
	 */
	Ti.App.fireEvent('closeSignUpTabGroup');
}