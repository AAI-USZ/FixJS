function onBuildFailed(buildEvent) {
		var notification = {
			message: interpolate('Build failed - {{0}}', [buildEvent.buildName]),
			details: buildEvent.group,
			url: buildEvent.url,
			backgroundColor: '#0D0',
			sticky: true
		};
		showNotification(notification);
		updateBadge(buildEvent.state);
	}