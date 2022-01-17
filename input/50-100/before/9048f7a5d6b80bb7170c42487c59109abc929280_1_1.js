function () {
															//this.setAttribute('class',this.highlight);
															this.overlay.style['border-color'] =  'rgb('+ (R - 32) +', '+ (G - 32) +', '+ (B - 32) +')';
															innerChildNode.fingerDown = true;
															innerChildNode.contextShown = false;
															if (innerChildNode.contextMenu) {
																window.setTimeout(this.touchTimer, 667);
															}
														}