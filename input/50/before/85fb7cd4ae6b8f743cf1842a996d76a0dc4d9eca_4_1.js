function (resourceName, req, callback, config) {
			// remove suffixes (future)
			// hook up callbacks
			var cb = callback.resolve || callback,
				eb = callback.reject || error;
			// get the text
			fetchText(req['toUrl'](resourceName), cb, eb);
		}