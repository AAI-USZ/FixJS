function (url, callback) {
			var tab = opera.extension.tabs.create({url:url, focused:true});
			emit(callback, tab.id, tab.url);
		}