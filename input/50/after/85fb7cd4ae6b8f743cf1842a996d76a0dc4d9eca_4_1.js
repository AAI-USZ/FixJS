function (resourceName, req, callback, config) {
			// remove suffixes (future)
			// get the text
			fetchText(req['toUrl'](resourceName), callback, callback['error'] || error);
		}