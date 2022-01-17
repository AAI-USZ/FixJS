function onBuildFixed(buildEvent) {
			failedCount--;
			buildFixed.dispatch({
				message: buildEvent.message,
				details: buildEvent.details,
				url: buildEvent.url,
				state: getCurrentState()
			});
		}