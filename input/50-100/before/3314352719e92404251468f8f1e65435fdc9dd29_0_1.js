function(msg) {
	if (msg instanceof Error) {
		msg = {
			type: msg.type,
			message: msg.message,
			stack: msg.stack,
			stackArray: msg.stack.split('\n').slice(1).map(trim)
		};
	} else {
		msg = {message: msg};
	}
	return {error: msg};
}