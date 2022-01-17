function handleTabUpdate (tabId, changeInfo, tab) {
			if (targets[tabId] && changeInfo.url && targets[tabId].startUrl != tab.url) {
				emit(targets[tabId].callback, tab.url);
				delete targets[tabId];
				if (countOf(targets) == 0) {
					chrome.tabs.onUpdated.removeListener(handleTabUpdate);
					chrome.tabs.onRemoved.removeListener(handleTabRemove);
				}
			}
		}