function hideNotificationMenu(event) {
	if (menuOpened && timeout) {
		var menu = document.getElementById("notificationList");
		menu.style.opacity = 0.0;
		menu.style.cursor = "default";
		menuOpened = false;
		clearTimeout(timeout);
	}
}