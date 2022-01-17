function (e) {
			if (typeof params.progressCallback === 'function') {
				params.progressCallback(e.loaded, e.total);
			}
		}