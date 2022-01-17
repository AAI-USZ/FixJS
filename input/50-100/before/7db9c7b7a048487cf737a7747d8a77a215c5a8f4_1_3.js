function (id) {
			if (typeof id.activate == 'function') {
				id.activate();
			}
			else {
				getTabId(id, function (worker) {worker.activate();});
			}
		}