function(stel){
			// get the src name
			var src = stel.options.src,
				// and the src of the current interactive script
				interactiveSrc = getCachedInteractiveScript().src;


			interactives[src] = interactives[interactiveSrc];
			interactives[interactiveSrc] = null;
		}