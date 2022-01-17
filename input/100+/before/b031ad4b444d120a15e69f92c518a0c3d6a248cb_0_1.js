function loadScriptViaNodeHttp (def, success, fail) {
		var options, source;
		options = freeRequire('url').parse(def.url, false, true);
		source = http.get(options, success).on('error', fail);
		executeScript(source);
	}