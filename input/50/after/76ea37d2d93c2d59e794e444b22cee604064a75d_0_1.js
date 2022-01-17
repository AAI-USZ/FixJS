function(topic, data) {
		data = $.isFunction(data) ? {"handler": data} : data;
		events.subscribe($.extend({"topic": topic}, data));
	}