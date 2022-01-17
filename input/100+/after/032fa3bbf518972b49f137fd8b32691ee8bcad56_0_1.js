function(topic, context) {
	context = context || "global";
	if (topic) {
		var obj = Echo.Events._subscriptions[topic] = Echo.Events._subscriptions[topic] || {};
		$.each(context.split("/"), function(i, part) {
			if (!obj[part]) {
				obj[part] = {
					"contexts": {},
					"handlers": []
				};
			}
			obj = obj[part].contexts;
		});
	}
	return context;
}