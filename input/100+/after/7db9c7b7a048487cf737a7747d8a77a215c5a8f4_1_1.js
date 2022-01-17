function handleTabUpdate (tabId, changeInfo, tab) {
			if (!targets[tabId] || !changeInfo.url) return;
			var target = targets[tabId];
			var isStartUrl = baseUrl(tab.url) == baseUrl(target.startUrl);
			if (tab.url == '' || target.state && !isStartUrl) {
				emit(target.callback, tab.url);
				delete targets[tabId];
				if (countOf(targets) == 0) {
					chrome.tabs.onUpdated.removeListener(handleTabUpdate);
					chrome.tabs.onRemoved.removeListener(handleTabRemove);
				}
			}
			else if (!target.state && isStartUrl) {
				target.state = true;
			}
		}