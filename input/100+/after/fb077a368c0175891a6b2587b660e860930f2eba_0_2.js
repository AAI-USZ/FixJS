f		var tmplConverter = tmpl.converters;
		tmplConverter = tmplConverter && tmplConverter[converter] || $viewsConverters[converter];
		return tmplConverter ? tmplConverter.call(view, text) : (error("Unknown converter: {{"+ converter + ":"), text);
	}
