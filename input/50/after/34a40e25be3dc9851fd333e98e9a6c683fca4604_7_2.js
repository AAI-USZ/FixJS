function onBuildFixed(buildEvent) {
			failedCount--;
			buildFixed.dispatch({
				buildName: buildEvent.buildName,
				group: buildEvent.group,
				url: buildEvent.url,
				state: getCurrentState()
			});
		}