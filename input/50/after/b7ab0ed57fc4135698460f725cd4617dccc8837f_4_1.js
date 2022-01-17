function (e) {
			if (typeof params.progressCallback === 'function') {
				params.progressCallback.call(x, e.loaded, e.total);
			}
		}