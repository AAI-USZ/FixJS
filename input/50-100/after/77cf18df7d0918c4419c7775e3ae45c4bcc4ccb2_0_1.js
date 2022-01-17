function(stel){
		// check if disabled by steal.loading()
		if (!support.interactive) {
			return;
		}
		
		// get the src name
		var src = stel.options.src,
			// and the src of the current interactive script
			interactiveSrc = getCachedInteractiveScript().src;

		interactives[src] = interactives[interactiveSrc];
		interactives[interactiveSrc] = null;

	}