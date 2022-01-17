function() {
	var control = this;
	var events = {
		"prepare": function(params) {
			params.context = params.context || control.config.get("context");
			params.handler = $.proxy(params.handler, control);
			return params;
		},
		"publish": function(params) {
			Echo.Events.publish(events.prepare(params));
		},
		"subscribe": function(params) {
			Echo.Events.subscribe(events.prepare(params));
		},
		"unsubscribe": Echo.Events.unsubscribe
	};
	$.each(control.manifest.events, function(topic, data) {
		data = $.isFunction(data) ? {"handler": data} : data;
		events.subscribe($.extend({"topic": topic}, data));
	});
	// subscribe all root level controls to the user login/logout event
	// and call "refresh" control method
	if (!this.dependant()) {
		events.subscribe({
			"topic": "Echo.UserSession.onInvalidate",
			"context": "global",
			"handler": control.refresh
		});
	}
	return events;
}