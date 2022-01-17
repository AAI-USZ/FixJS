function(params) {
			params.topic = control.manifest.name + "." + params.topic;
			params.context = control.config.get("context");
			params.callback = $.proxy(params.callback, control);
			return params;
		}