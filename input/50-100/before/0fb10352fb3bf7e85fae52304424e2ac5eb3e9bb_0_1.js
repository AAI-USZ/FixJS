function showNotificationMenu() {
	var menu = document.getElementById("notificationList");
	menu.style.opacity = 1.0;
	menu.style.cursor = "pointer";
	menuTimer = 0;
	timeout = setTimeout(function() { menuOpened = true; }, 500);
}