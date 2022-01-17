function (file, callback) {
			var tab = opera.extension.tabs.create({
				url:location.href.replace(/\/[^\/]*$/, '/') + file, focused:true
			});
			emit(callback, tab.id, url);
		}