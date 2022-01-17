f		var tmplConverter = tmpl.converters;
		tmplConverter = tmplConverter && tmplConverter[converter] || converters[converter];
		return tmplConverter ? tmplConverter.call(view, text) : (error("Unknown converter: {{"+ converter + ":"), text);
	}
