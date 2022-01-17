function(value) {
								var percent = 0,
									width;
								if (value && (value < parseInt(this.outerElement.minValue) || value > parseInt(this.outerElement.maxValue))) {
									return;
								} else if (value) {
									this.outerElement.value = value;
								}
								// Calculate our percentage
								if (this.outerElement.value == this.outerElement.maxValue) {
									percent = 1;
								} else {
									percent = this.outerElement.value/(parseInt(this.outerElement.maxValue) + parseInt(this.outerElement.minValue));								
								}	
								// Determine width by percentage
								range.outerElement.currentXPos = Math.floor(parseInt(window.getComputedStyle(this.outerElement.outer).width) * percent);
								this.outerElement.fill.style.width = outerElement.currentXPos + 'px';
								this.outerElement.inner.style['-webkit-transform'] = 'translate3d(' + range.outerElement.currentXPos + 'px,0px,0px)';
							}