function(msg) {
	if (typeof msg === 'object' && msg.message) {
		msg = {
			type: msg.type,
			message: msg.message,
			stack: msg.stack
		};
		if (msg.stack) {
			msg.stackArray = msg.stack.split('\n').slice(1).map(trim)
		}
	} else {
		msg = {message: msg};
	}
	return {error: msg};
}