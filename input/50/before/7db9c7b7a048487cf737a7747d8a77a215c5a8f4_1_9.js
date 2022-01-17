function (id) {
			if (typeof id.close == 'function') {
				id.close();
			}
			else {
				getTabId(id, function (worker) {worker.tab.close();});
			}
		}