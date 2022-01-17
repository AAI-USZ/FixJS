function onBuildFixed(buildEvent) {

		function allFixedNotification(buildEvent) {
			return {
				message: 'All builds are green',
				details: '',
				url: buildEvent.url,
				backgroundColor: '#D00'
			};
		}

		function fixedNotification(buildEvent) {
			return {
				message: interpolate('Build fixed - {{0}}', [buildEvent.buildName]),
				details: buildEvent.group,
				url: buildEvent.url,
				backgroundColor: '#D00'
			};
		}
		
		var notification = (buildEvent.state.failedBuildsCount === 0) ?
			allFixedNotification(buildEvent) : fixedNotification(buildEvent);
		showNotification(notification);
		updateBadge(buildEvent.state);
	}