function (id) {
			if (typeof id.activate == 'function') {
				try {id.activate();} catch (e) {}
			}
			else {
				getTabId(id, function (worker) {worker.activate();});
			}
		}