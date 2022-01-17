function () {
															//this.setAttribute('class',this.highlight);
															this.overlay.style['border-color'] =  bb.options.shades.darkOutline;
															innerChildNode.fingerDown = true;
															innerChildNode.contextShown = false;
															if (innerChildNode.contextMenu) {
																window.setTimeout(this.touchTimer, 667);
															}
														}