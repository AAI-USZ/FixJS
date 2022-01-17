function(event) {
										if (outerElement.isActivated === false) {
											outerElement.isActivated = true;
											outerElement.initialXPos = event.touches[0].pageX;	
											outerElement.halo.style['-webkit-transform'] = 'scale(1)';
											outerElement.halo.style['-webkit-animation-name'] = 'explode';
											outerElement.indicator.setAttribute('class','indicator indicator_hover');
											outerElement.indicator.style.background = '-webkit-linear-gradient(top, rgb('+ R +', '+ G +', '+ B +') 0%, rgb('+ (R + 16) +', '+ (G + 16) +', '+ (B + 16) +') 100%)';
											
											
										}
									}