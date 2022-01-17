function(params) {
		params.context = params.context || control.config.get("context");
		params.handler = $.proxy(params.handler, control);
		return params;
	}