function(event) {
										if (outerElement.isActivated === false) {
											outerElement.isActivated = true;
											outerElement.initialXPos = event.touches[0].pageX;	
											outerElement.halo.style['-webkit-transform'] = 'scale(1)';
											outerElement.halo.style['-webkit-animation-name'] = 'explode';
											outerElement.indicator.setAttribute('class','indicator bb-bb10-slider-indicator-' + color+ ' indicator-hover-'+color);
											outerElement.indicator.style.background = '-webkit-linear-gradient(top, rgb('+ bb.options.shades.R +', '+ bb.options.shades.G +', '+ bb.options.shades.B +') 0%, rgb('+ (bb.options.shades.R + 16) +', '+ (bb.options.shades.G + 16) +', '+ (bb.options.shades.B + 16) +') 100%)';
											outerElement.fill.style.background = outerElement.fill.active;
										}
									}