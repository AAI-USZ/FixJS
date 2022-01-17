function(value) {
							var percent = 0,
								width,
								xpos;
							if ((value && (value < 0)) || (value && (value > parseInt(this.outerElement.maxValue)))) {
								alert('should not be in here');
								return;
							} else if (value) {
								this.outerElement.value = value;
								this.value = value;
							} else if (value == 0) {
								this.outerElement.value = 0;
								this.value = 0;
							} else {
								value = parseInt(this.outerElement.value);
							}
							
							// Calculate our percentage
							if (value == this.outerElement.maxValue) {
								percent = 1;
								this.outerElement.fill.style.background ='-webkit-linear-gradient(top,  '+accentColor+' 0%, '+highlightColor+' 100%)';
							} else if (value == 0) {
								this.outerElement.outer.setAttribute('class','outer bb-progress-outer-' + color + ' bb-progress-outer-idle-background-' + color);
							} else {
								this.outerElement.outer.setAttribute('class','outer bb-progress-outer-' + color);
								this.outerElement.fill.setAttribute('class',this.outerElement.fill.normal);
								this.outerElement.fill.style.background ='';
								percent = (this.outerElement.value/parseInt(this.outerElement.maxValue));								
							}	
							
							// Determine width by percentage
							xpos = Math.floor(parseInt(window.getComputedStyle(this.outerElement.outer).width) * percent);
							this.outerElement.fill.style.width = xpos + 'px';
							this.outerElement.inner.style['-webkit-transform'] = 'translate3d(' + xpos + 'px,0px,0px)';
						}