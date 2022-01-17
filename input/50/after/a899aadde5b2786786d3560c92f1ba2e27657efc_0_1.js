function() {

		// notify listeners when finished
		// ~ try and use the default listener if the list isn't set
		var listeners = self.listeners || [self];


		for (var i = 0; i < listeners.length; i++) {
			listeners[i].onAfterPreloadImages({background: background});
		}
		
		
	}