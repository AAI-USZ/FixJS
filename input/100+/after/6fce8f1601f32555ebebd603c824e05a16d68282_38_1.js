function updateBadge(state) {
		
		function showBuildFailedBadge(state) {
			var badgeInfo = {
				text: state.failedBuildsCount.toString(),
				color: [255, 0, 0, 200]
			};
			setBadge(badgeInfo);
		}

		function showBuildFixedBadge() {
			var badgeInfo = {
				text: '\u2022',
				color: [0, 255, 0, 200]
			};
			setBadge(badgeInfo);
		}

		function showStateUnknownBadge() {
			var badgeInfo = {
				text: ' ',
				color: [200, 200, 200, 200]
			};
			setBadge(badgeInfo);
		}

		function setBadge(badgeInfo) {
			chrome.browserAction.setBadgeText({ text: badgeInfo.text });
			chrome.browserAction.setBadgeBackgroundColor({ color: badgeInfo.color });
		}

		if (state == null) {
			showStateUnknownBadge();
		} else if (state.failedBuildsCount === 0) {
			showBuildFixedBadge();
		} else {
			showBuildFailedBadge(state);
		}

	}