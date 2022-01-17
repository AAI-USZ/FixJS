function() {
	var $elems = this, $elem, e, ctx,
		args = ([]).slice.call(arguments, 0),
		layer;
		
	// Deal with all cases of argument placement
	/*
		0. layer name/index
		1. properties
		2. duration/options
		3. easing
		4. complete function
		5. step function
	*/
	
	if (typeof args[0] === 'object' && !args[0].layer) {
		// Animate first layer by default
		args.unshift(0);
	}
	
	if (typeof args[2] === 'object') {
	
		// Accept an options object for animation
		args.splice(2, 0, args[2].duration || NULL);
		args.splice(3, 0, args[3].easing || NULL);
		args.splice(4, 0, args[4].complete || NULL);
		args.splice(5, 0, args[5].step || NULL);
			
	} else {
	
		if (args[2] === UNDEFINED) {
			// If object is the last argument
			args.splice(2, 0, NULL);
			args.splice(3, 0, NULL);
			args.splice(4, 0, NULL);
		} else if (typeof args[2] === 'function') {
			// If callback comes after object
			args.splice(2, 0, NULL);
			args.splice(3, 0, NULL);
		}
		if (args[3] === UNDEFINED) {
			// If duration is the last argument
			args[3] = NULL;
			args.splice(4, 0, NULL);
		} else if (typeof args[3] === 'function') {
			// If callback comes after duration
			args.splice(3, 0, NULL);
		}

	}
	
	// Run callback function when animation completes
	function complete($elem, layer) {
		return function() {
			showProps(layer);
			$elem.drawLayers();
			if (args[4]) {
				args[4].call($elem[0]);
			}
		};
	}
	// Redraw layers on every frame of the animation
	function step($elem, layer) {
		return function(now, fx) {
			showProps(layer);
			$elem.drawLayers();
			// Run callback function for every frame (if specified)
			if (args[5]) {
				args[5].call($elem[0], now, fx);
			}
		};
	}

	for (e=0; e<$elems.length; e+=1) {
		$elem = $($elems[e]);
		ctx = getContext($elems[e]);
		if (ctx) {
			
			// If a layer object was passed, use it the layer to be animated
			layer = $elem.getLayer(args[0]);
			
			// Ignore layers that are functions
			if (layer && layer.method !== $.fn.draw) {
				
				// Bypass jQuery CSS Hooks for CSS properties (width, opacity, etc.)
				hideProps(layer);
				hideProps(args[1]);
								
				// Animate layer
				$(layer).animate(args[1], {
					duration: args[2],
					easing: ($.easing[args[3]] ? args[3] : NULL),
					// When animation completes
					complete: complete($elem, layer),
					// Redraw canvas for every animation frame
					step: step($elem, layer)
				});
			}
		}
	}
	return $elems;
}