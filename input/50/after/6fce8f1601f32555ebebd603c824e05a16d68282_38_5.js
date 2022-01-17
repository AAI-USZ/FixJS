function setBadge(badgeInfo) {
			chrome.browserAction.setBadgeText({ text: badgeInfo.text });
			chrome.browserAction.setBadgeBackgroundColor({ color: badgeInfo.color });
		}