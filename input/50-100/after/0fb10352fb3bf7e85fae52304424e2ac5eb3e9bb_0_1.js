function showNotificationMenu() {
	menu.style.webkitAnimationPlayState = "running";
	menuTimer = 0;
	timeout = setTimeout(function() { menuOpened = true; }, 500);
}