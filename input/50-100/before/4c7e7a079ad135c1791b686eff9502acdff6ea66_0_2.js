function displayNotification() {
    if (window.webkitNotifications.checkPermission() != 0) { // 0 is PERMISSION_ALLOWED
	getNotificationPermission();
	setTimeout(displayNotification, 5000);
    } else {
	notification = window.webkitNotifications.createNotification(
            'icon.png', 'Notification Title', 'Notification content...');
	notification.show();
    }
}