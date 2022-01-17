function(container, id, popping) {
		// Fire the onscreenready and then apply our changes in doLoad()
		if (bb.options.onscreenready) {
			bb.options.onscreenready(container, id);
		}
		bb.doLoad(container);
		// Load in the new content
		document.body.appendChild(container);
		
		var screen = container.querySelectorAll('[data-bb-type=screen]'),
			effect,
			effectApplied = false,
			overlay;
				
        if (screen.length > 0 ) {
            screen = screen[0];
			screen.popping = popping;
			if (screen.hasAttribute('data-bb-effect')) {
				// see if there is a display effect
				if (!bb.device.isBB5 && !bb.device.isBB6) {
					effect = screen.getAttribute('data-bb-effect');
					if (effect) {
						if (effect.toLowerCase() == 'fade') {
							effectApplied = true;
							bb.screen.fadeIn(screen);
						} else if ((effect.toLowerCase() == 'slide-left') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideLeft(screen);
						} else if ((effect.toLowerCase() == 'slide-right') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideRight(screen);
						} else if ((effect.toLowerCase() == 'slide-up') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideUp(screen);
						}  else if ((effect.toLowerCase() == 'slide-down') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideDown(screen);
						} 
						screen.style.display = 'inline'; // This is a wierd hack
						
						// Listen for when the animation ends so that we can clear the previous screen
						if (effectApplied) {
							// Create our overlay
							overlay = document.createElement('div');
							screen.overlay = overlay;
							overlay.setAttribute('class','bb-transition-overlay');
							document.body.appendChild(overlay);
							// Add our listener and animation state
							bb.screen.animating = true;
							screen.addEventListener('webkitAnimationEnd', function() { 
									var s = this.style;
									bb.screen.animating = false;	
									// Remove our overlay
									document.body.removeChild(this.overlay);
									this.overlay = null;
									// Only remove the screen at the end of animation "IF" it isn't the only screen left
									if (bb.screens.length > 1) {
										if (!this.popping) {
											bb.removePreviousScreenFromDom();
										} else {
											bb.removeTopMostScreenFromDom();
										}
									}
									// Clear style changes that may have been made for the animation
									s.left = '';
									s.right = '';
									s.top = '';
									s.bottom = '';
									s.width = '';
									s.height = '';
									s['-webkit-animation-name'] = '';
									s['-webkit-animation-duration'] = '';
									s['-webkit-animation-timing-function'] = ''; 
									s['-webkit-transform'] = '';
								});
						}
					} 
				}				
			} 
			bb.createScreenScroller(screen); 
		} 
		
		// Fire the ondomready after the element is added to the DOM and we've set our animation flags
		if (bb.options.ondomready) {
			bb.domready.container = container;
			bb.domready.id = id;
			setTimeout(bb.domready.fire, 1); 
		}
		
		// If an effect was applied then the popping will be handled at the end of the animation
		if (!effectApplied) {
			if (!popping && (bb.screens.length > 0)) {
				bb.removeTopMostScreenFromDom();
			}
		}
	}