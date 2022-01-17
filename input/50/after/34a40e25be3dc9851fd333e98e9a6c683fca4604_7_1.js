function onBuildFailed(buildEvent) {
			failedCount++;
			buildFailed.dispatch({
				buildName: buildEvent.buildName,
				group: buildEvent.group,
				url: buildEvent.url,
				state: getCurrentState()
			});
		}