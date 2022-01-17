function onBuildFailed(buildEvent) {
		var notification = {
			message: buildEvent.message,
			details: buildEvent.details,
			url: buildEvent.url,
			backgroundColor: '#0D0',
			sticky: true
		};
		showNotification(notification);
		updateBadge(buildEvent.state);
	}