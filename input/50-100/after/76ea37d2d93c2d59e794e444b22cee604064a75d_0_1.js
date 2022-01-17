function(params) {
			params.topic = params.external
				? params.topic
				: control.manifest.name + "." + params.topic;
			params.context = params.context || control.config.get("context");
			params.handler = $.proxy(params.handler, control);
			return params;
		}