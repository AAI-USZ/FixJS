function (tab) {
				if (id instanceof MessagePort && tab.port == id
				||  typeof id == 'number' && tab.id == id) {
					targets.push({tab:tab, startUrl:tab.url, callback:callback});
					startTimer();
					return true;
				}
			}