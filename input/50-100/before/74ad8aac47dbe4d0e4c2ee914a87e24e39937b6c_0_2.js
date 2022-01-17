function(event) {
											// Only care about moves if peeking
											if (!this.menu.peeking) return;
											var touch = event.touches[0];
											if (this.startPos && (this.startPos - touch.pageX > this.threshold)) {
												this.menu.show();
												this.closeMenu = false;
											}
										}