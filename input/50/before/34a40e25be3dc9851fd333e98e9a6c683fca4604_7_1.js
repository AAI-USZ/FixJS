function onBuildFailed(buildEvent) {
			failedCount++;
			buildFailed.dispatch({
				message: buildEvent.message,
				details: buildEvent.details,
				url: buildEvent.url,
				state: getCurrentState()
			});
		}