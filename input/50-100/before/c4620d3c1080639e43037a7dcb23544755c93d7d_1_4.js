function(from, room, text, message) {
		for (var i = listeners.length - 1; i >= 0; i--) {
			var match = text.match(listeners[i].regex);
			if (match) {
				listeners[i].callback(match, room, from);
			}
		};
	}