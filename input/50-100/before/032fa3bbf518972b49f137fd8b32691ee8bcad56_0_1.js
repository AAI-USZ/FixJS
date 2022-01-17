function(params) {
	params.context = Echo.Events._initContext(params.topic, params.context);
	Echo.Events._executeForDeepestContext(params.topic, params.context, function(obj, lastContext, restContexts) {
		Echo.Events._callHandlers(obj[lastContext], params, restContexts);
	});
	if (!params.bubble && params.context !== "empty") {
		params.context = "empty";
		Echo.Events.publish(params);
	}
}