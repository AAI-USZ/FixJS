function (id) {
			if (typeof id.close == 'function') {
				try {id.close();} catch (e) {}
			}
			else {
				getTabId(id, function (worker) {worker.tab.close();});
			}
		}