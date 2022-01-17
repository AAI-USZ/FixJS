function convert(converter, view, tmpl, text) {
		var tmplConverters = tmpl.converters;
		converter = tmplConverters && tmplConverters[converter] || converters[converter];
		return converter ? converter.call(view, text) : text;
	}