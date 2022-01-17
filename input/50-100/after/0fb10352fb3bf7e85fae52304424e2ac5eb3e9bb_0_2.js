function hideNotificationMenu(event) {
	if (menuOpened && timeout) {
		menuOpened = false;
		clearTimeout(timeout);
	}
}