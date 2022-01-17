function displayNotification() {
    if (window.webkitNotifications.checkPermission() != 0) { // 0 is PERMISSION_ALLOWED
	getNotificationPermission();
	setTimeout(displayNotification, 5000);
    } else {
	notification = window.webkitNotifications.createNotification(
            '', 'Your Order Request', 'Was accepted!');
	notification.show();
    }
}