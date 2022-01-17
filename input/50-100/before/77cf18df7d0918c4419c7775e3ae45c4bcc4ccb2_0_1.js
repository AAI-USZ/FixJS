function(stel){
		// get the src name
		var src = stel.options.src,
			// and the src of the current interactive script
			interactiveSrc = getCachedInteractiveScript().src;

		// This is used for packaged scripts.  As the packaged script executes, we grab the
		// dependencies that have come so far and assign them to the loaded script
		steal.preloaded = before(steal.preloaded, function(stel){

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
		});

	}