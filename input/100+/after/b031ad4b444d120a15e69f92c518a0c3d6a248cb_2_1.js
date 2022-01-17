function loadScriptViaNodeHttp (def, success, fail) {
		var options, source;
		options = freeRequire('url').parse(def.url, false, true);
		source = '';
		http.get(options, function (response) {
			response
				.on('data', function (chunk) { source += chunk; })
				.on('end', function () { executeScript(source); success(); })
				.on('error', fail);
		}).on('error', fail);
	}