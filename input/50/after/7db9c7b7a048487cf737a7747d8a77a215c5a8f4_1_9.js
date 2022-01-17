function (tab) {
					callback && emit(callback, tab, url);
					callback = null;
				}