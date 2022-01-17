function () {
										if (outerElement.isActivated === true) {
											outerElement.isActivated = false;
											outerElement.currentXPos = outerElement.transientXPos;
											outerElement.value = parseInt(outerElement.range.value);
											outerElement.halo.style['-webkit-transform'] = 'scale(0)';
											outerElement.halo.style['-webkit-animation-name'] = 'implode';
											outerElement.indicator.setAttribute('class','indicator');    
											outerElement.indicator.style.background = '';											
										}
									}