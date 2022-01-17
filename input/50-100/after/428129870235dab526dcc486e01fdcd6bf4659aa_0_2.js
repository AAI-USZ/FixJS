function() {
															if (this.overlay) {
																this.overlay.setAttribute('style','');
															}
															itemNode.fingerDown = false;
															if (itemNode.contextShown) {
																event.preventDefault();
																event.stopPropagation();
															}
														}