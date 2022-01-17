function (request, response, target, params) {
	var factory = this.controller_factory_;
	if (!factory) {
		log('Error: No controller factory specified');
		response.end(500);
		return;
	}

	var target_parts = target.split(':');
	var action = target_parts[2];

	var controller = factory.createController(target_parts[0], target_parts[1], this, request, response);
	if (!controller) {
		log('Error: Missing target controller ' + target_parts[0] + ':' + target_parts[1]);
		response.end(500);
	} else if (!controller.hasAction(action)) {
		log('Error: Missing target action ' + target);
		response.end(500);
	} else {
		try {
			controller.callAction(action, params);
		} catch (err) {
			log(err.stack || err.message);
			response.end(500);
		}
	}
}