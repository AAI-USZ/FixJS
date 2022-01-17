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

							// Calculate percentage and styling
							if (value == this.outerElement.maxValue) {
								this.outerElement.fill.style.background = '-webkit-gradient(linear, center top, center bottom, from(' + accentColor+ '), to('+highlightColor+'))';
								percent = 1;
							} else if (value == 0) {
								this.outerElement.outer.setAttribute('class','outer bb-progress-outer-' + color + ' bb-progress-outer-idle-background-' + color);
							} else {
								if (this.outerElement.state == bb.progress.PAUSED) {
									this.outerElement.fill.style.background = '-webkit-gradient(linear, center top, center bottom, from(#EDC842), to(#BA991E))';
								} else if (this.outerElement.state == bb.progress.ERROR) {
									this.outerElement.fill.style.background = '-webkit-gradient(linear, center top, center bottom, from( #E04242), to(#D91111))';
								} else {
									this.outerElement.outer.setAttribute('class','outer bb-progress-outer-' + color);
									this.outerElement.fill.setAttribute('class',this.outerElement.fill.normal);
									this.outerElement.fill.style.background ='';	
								} 
								percent = (this.outerElement.value/parseInt(this.outerElement.maxValue));
							}	
							
							// Determine width by percentage
							xpos = Math.floor(parseInt(window.getComputedStyle(this.outerElement.outer).width) * percent);
							this.outerElement.fill.style.width = xpos + 'px';
						}