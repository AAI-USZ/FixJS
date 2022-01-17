function showNotification(notificationInfo) {
		function closeNotification() {
			notification.cancel();
		}

		var notification = window.webkitNotifications.createNotification(
			"img/icon-128.png", // The image.
			notificationInfo.message, // The title.
			notificationInfo.details // The body.
		);
		notification.show();
		if (!notificationInfo.sticky) {
			var timer = new Timer();
			timer.elapsed.addOnce(closeNotification);
			timer.start(notificationTimeoutInSec);
		}
	}