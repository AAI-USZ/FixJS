function(elements) {
		if (bb.device.isBB10) {
			var res = (bb.device.isPlayBook) ? 'lowres' : 'hires',
				i,
				outerElement,
				containerDiv,
				dotDiv,
				centerDotDiv,
				radio,
				color = bb.screen.controlColor;			
				
			// Apply our transforms to all Radio buttons
			for (i = 0; i < elements.length; i++) {
				outerElement = elements[i];
				input = outerElement;
				outerElement = document.createElement('div');
				outerElement.setAttribute('class','bb-bb10-radio-container-'+res + '-'+color);
				outerElement.input = input;

				// Make the existing <input[type=radio]> invisible so that we can hide it and create our own display
				input.style.display = 'none';
				
				// Create the dropdown container and insert it where the select was
				input.radio = outerElement;
				input.parentNode.insertBefore(outerElement, input);
				// Insert the select as an invisible node in the new dropdown element
                outerElement.appendChild(input);
				
				// Create our colored dot
				dotDiv = document.createElement('div');
				dotDiv.setAttribute('class','bb-bb10-radio-dot-'+res);
				dotDiv.highlight = '-webkit-linear-gradient(top,  rgb('+ (bb.options.shades.R + 32) +', '+ (bb.options.shades.G + 32) +', '+ (bb.options.shades.B + 32) +') 0%, rgb('+ bb.options.shades.R +', '+ bb.options.shades.G +', '+ bb.options.shades.B +') 100%)';
				dotDiv.touchHighlight = '-webkit-linear-gradient(top,  rgba('+ (bb.options.shades.R - 64) +', '+ (bb.options.shades.G - 64) +', '+ (bb.options.shades.B - 64) +',0.25) 0%, rgba('+ bb.options.shades.R +', '+ bb.options.shades.G +', '+ bb.options.shades.B +',0.25) 100%)';
				if (input.checked) {
					dotDiv.style.background = dotDiv.highlight;
				}
				outerElement.dotDiv = dotDiv;
				outerElement.appendChild(dotDiv);
				
				// Set up our center dot
				centerDotDiv = document.createElement('div');
				centerDotDiv.setAttribute('class','bb-bb10-radio-dot-center-'+res);
				if (!input.checked) {
					bb.radio.resetDot(centerDotDiv);
				}
				dotDiv.appendChild(centerDotDiv);
				dotDiv.centerDotDiv = centerDotDiv;
				
				dotDiv.slideOutUp = function() {
									if (bb.device.isPlayBook) {
										this.style.height = '0px';
										this.style.width = '10px';
										this.style.top = '9px';
										this.style.left = '15px';
									} else {
										this.style.height = '0px';
										this.style.width = '20px';
										this.style.top = '18px';
										this.style.left = '30px';
									}
									bb.radio.resetDot(this.centerDotDiv);
									this.style['-webkit-transition-property'] = 'all';
									this.style['-webkit-transition-duration'] = '0.1s';
									this.style['-webkit-transition-timing-function'] = 'linear';
									this.style['-webkit-backface-visibility'] = 'hidden';
									this.style['-webkit-perspective'] = 1000;
									this.style['-webkit-transform'] = 'translate3d(0,0,0)';
								};
				dotDiv.slideOutUp = dotDiv.slideOutUp.bind(dotDiv);
				
				dotDiv.slideOutDown = function() {
									if (bb.device.isPlayBook) {
										this.style.height = '0px';
										this.style.width = '10px';
										this.style.top = '30px';
										this.style.left = '15px';
									} else {
										this.style.height = '0px';
										this.style.width = '20px';
										this.style.top = '60px';
										this.style.left = '30px';
									}
									bb.radio.resetDot(this.centerDotDiv);
									this.style['-webkit-transition-property'] = 'all';
									this.style['-webkit-transition-duration'] = '0.1s';
									this.style['-webkit-transition-timing-function'] = 'linear';
									this.style['-webkit-backface-visibility'] = 'hidden';
									this.style['-webkit-perspective'] = 1000;
									this.style['-webkit-transform'] = 'translate3d(0,0,0)';
								};
				dotDiv.slideOutDown = dotDiv.slideOutDown.bind(dotDiv);
				
				dotDiv.slideIn = function() {
									if (bb.device.isPlayBook) {
										this.style.height = '20px';
										this.style.width = '20px';
										this.style.top = '10px';
										this.style.left = '9px';
										this.centerDotDiv.style.height = '10px';
										this.centerDotDiv.style.width = '10px';
										this.centerDotDiv.style.top = '5px';
										this.centerDotDiv.style.left = '5px';
									} else {
										this.style.height = '40px';
										this.style.width = '40px';
										this.style.top = '19px';
										this.style.left = '19px';
										this.centerDotDiv.style.height = '18px';
										this.centerDotDiv.style.width = '18px';
										this.centerDotDiv.style.top = '11px';
										this.centerDotDiv.style.left = '11px';
									}
									this.style['-webkit-transition-property'] = 'all';
									this.style['-webkit-transition-duration'] = '0.1s';
									this.style['-webkit-transition-timing-function'] = 'ease-in';
									this.style['-webkit-backface-visibility'] = 'hidden';
									this.style['-webkit-perspective'] = 1000;
									this.style['-webkit-transform'] = 'translate3d(0,0,0)';
									// Make our center white dot visible
									this.centerDotDiv.style['-webkit-transition-delay'] = '0.1s';
									this.centerDotDiv.style['-webkit-transition-property'] = 'all';
									this.centerDotDiv.style['-webkit-transition-duration'] = '0.1s';
									this.centerDotDiv.style['-webkit-transition-timing-function'] = 'ease-in';
									this.centerDotDiv.style['-webkit-backface-visibility'] = 'hidden';
									this.centerDotDiv.style['-webkit-perspective'] = 1000;
									this.centerDotDiv.style['-webkit-transform'] = 'translate3d(0,0,0)';
									
								};
				dotDiv.slideIn = dotDiv.slideIn.bind(dotDiv);
				
				// Set up properties
				outerElement.selectedRadio = undefined;		
				outerElement.slideFromTop = true;
				outerElement.ontouchstart = function() {
												if (!this.input.checked) {	
													this.slideFromTop = true;
													// See if it should slide from top or bottom
													this.selectedRadio = this.getCurrentlyChecked();
													if (this.selectedRadio) {
														if (this.getTop(this.selectedRadio.radio) >= this.getTop(this)) {
															this.slideFromTop = false;
														}
													} 
													// Reset for our highlights
													this.dotDiv.style['-webkit-transition'] = 'none';
													if (bb.device.isPlayBook) {
														this.dotDiv.style.height = '20px';
														this.dotDiv.style.width = '20px';
														this.dotDiv.style.top = '10px';
														this.dotDiv.style.left = '9px';
													} else {
														this.dotDiv.style.height = '40px';
														this.dotDiv.style.width = '40px';
														this.dotDiv.style.top = '19px';
														this.dotDiv.style.left = '19px';
													}
													// Reset our center white dot
													bb.radio.resetDot(this.dotDiv.centerDotDiv);
													// Do our touch highlight
													this.dotDiv.style.background = this.dotDiv.touchHighlight;
												}
											};
				outerElement.ontouchend = function() {
												if (!this.input.checked) {
													this.dotDiv.style['-webkit-transition'] = 'none';
													if (bb.device.isPlayBook) {
														this.dotDiv.style.height = '0px';
														this.dotDiv.style.width = '9px';
														this.dotDiv.style.left = '16px';
													} else {
														this.dotDiv.style.height = '0px';
														this.dotDiv.style.width = '18px';
														this.dotDiv.style.left = '32px';
													}
													// Reset top position
													if (this.slideFromTop) {
														this.dotDiv.style.top = bb.device.isPlayBook ? '9px' : '18px';
													} else {
														this.dotDiv.style.top = bb.device.isPlayBook ? '30px' : '60px';
													}
												}
											};
				outerElement.onclick = function() {
												if (!this.input.checked) {
													var evObj = document.createEvent('HTMLEvents');
													evObj.initEvent('change', false, true );
													this.dotDiv.style.background = this.dotDiv.highlight;
													this.dotDiv.slideIn();
													if (this.selectedRadio) {
														this.selectedRadio.removeAttribute('checked');
														// fire the changed event for the previously checked radio
														this.selectedRadio.dispatchEvent(evObj);
														if (this.slideFromTop) {
															this.selectedRadio.radio.dotDiv.slideOutDown();
														} else {
															this.selectedRadio.radio.dotDiv.slideOutUp();
														}
													}
													this.input.setAttribute('checked','true');
													this.input.dispatchEvent(evObj);
												}
											};
				
				outerElement.getCurrentlyChecked = function() {
												var inputs = document.querySelectorAll('input[type=radio][name='+ this.input.name +'][checked=true]');
												if (inputs.length > 0) {
													return inputs[0];
												} else {
													return undefined;
												}
											};
				outerElement.getCurrentlyChecked = outerElement.getCurrentlyChecked.bind(outerElement);
				
				outerElement.getTop = function(element) {
									var top = 0;
									while (element) {
										top = top + element.offsetTop;
										element = element.offsetParent;
									}
									return top;
								};	
			}
		}
	}