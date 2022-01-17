function(container, id, popping) {
		// Fire the onscreenready and then apply our changes in doLoad()
		if (bb.options.onscreenready) {
			bb.options.onscreenready(container, id);
		}
		bb.doLoad(container);
		// Load in the new content
		document.body.appendChild(container);
		
		var screen = container.querySelectorAll('[data-bb-type=screen]'),
			animationScreen,
			effect,
			effectApplied = false,
			overlay;
				
        if (screen.length > 0 ) {
            screen = screen[0];
			// Swap the screen with the animation
			if (popping) {
				var previousContainer = bb.screens[bb.screens.length - 1].container,
					previousEffect;
				animationScreen = previousContainer.querySelectorAll('[data-bb-type=screen]')[0];
				previousEffect = animationScreen.hasAttribute('data-bb-effect') ? animationScreen.getAttribute('data-bb-effect') : undefined;
				// Reverse the animation
				if (previousEffect) {
					screen.style['z-index'] = '-100';
					if (previousEffect.toLowerCase() == 'fade'){
						animationScreen.setAttribute('data-bb-effect','fade-out');
					}else if (previousEffect.toLowerCase() == 'slide-left'){
						animationScreen.setAttribute('data-bb-effect','slide-out-right');
					} else if (previousEffect.toLowerCase() == 'slide-right')  {
						animationScreen.setAttribute('data-bb-effect','slide-out-left');
					} else if (previousEffect.toLowerCase() == 'slide-up')  {
						animationScreen.setAttribute('data-bb-effect','slide-out-down');
					}  else if (previousEffect.toLowerCase() == 'slide-down') {
						animationScreen.setAttribute('data-bb-effect','slide-out-up');
					} 
				}				
			} else {
				animationScreen = screen;
			}
			animationScreen.popping = popping;
			if (animationScreen.hasAttribute('data-bb-effect')) {
				// see if there is a display effect
				if (!bb.device.isBB5 && !bb.device.isBB6) {
					effect = animationScreen.getAttribute('data-bb-effect');
					if (effect) {
						if (effect.toLowerCase() == 'fade') {
							effectApplied = true;
							bb.screen.fadeIn(animationScreen);
						} else if (effect.toLowerCase() == 'fade-out') {
							effectApplied = true;
							bb.screen.fadeOut(animationScreen);
						} else if ((effect.toLowerCase() == 'slide-left') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideLeft(animationScreen);
						} else if ((effect.toLowerCase() == 'slide-out-left') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideOutLeft(animationScreen);
						} else if ((effect.toLowerCase() == 'slide-right') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideRight(animationScreen);
						} else if ((effect.toLowerCase() == 'slide-out-right') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideOutRight(animationScreen);
						} else if ((effect.toLowerCase() == 'slide-up') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideUp(animationScreen);
						} else if ((effect.toLowerCase() == 'slide-out-up') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideOutUp(animationScreen);
						} else if ((effect.toLowerCase() == 'slide-down') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideDown(animationScreen);
						}  else if ((effect.toLowerCase() == 'slide-out-down') && !bb.device.isBB7) {
							effectApplied = true;
							bb.screen.slideOutDown(animationScreen);
						}
						animationScreen.style.display = 'inline'; // This is a wierd hack
						
						// Listen for when the animation ends so that we can clear the previous screen
						if (effectApplied) {
							// Create our overlay
							overlay = document.createElement('div');
							animationScreen.overlay = overlay;
							overlay.setAttribute('class','bb-transition-overlay');
							document.body.appendChild(overlay);
							// Add our listener and animation state
							bb.screen.animating = true;
							animationScreen.doEndAnimation = function() {
									var s = this.style;
									bb.screen.animating = false;	
									// Remove our overlay
									document.body.removeChild(this.overlay);
									this.overlay = null;
									// Only remove the screen at the end of animation "IF" it isn't the only screen left
									if (bb.screens.length > 1) {
										if (!this.popping) {
											bb.removePreviousScreenFromDom();
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
										} else {
											this.style.display = 'none';
											this.parentNode.parentNode.removeChild(this.parentNode);
											// Pop it from the stack
											bb.screens.pop();	
										}
									}
									
									this.removeEventListener('webkitAnimationEnd',this.doEndAnimation);
								};
							animationScreen.doEndAnimation = animationScreen.doEndAnimation.bind(animationScreen);
							animationScreen.addEventListener('webkitAnimationEnd',animationScreen.doEndAnimation);
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
				//bb.removeTopMostScreenFromDom();
				bb.removePreviousScreenFromDom();
			} else if (popping) {
				var currentScreen = bb.screens[bb.screens.length-1].container;
				currentScreen.parentNode.removeChild(currentScreen);
				// Pop it from the stack
				bb.screens.pop();	
			}
		}
	}