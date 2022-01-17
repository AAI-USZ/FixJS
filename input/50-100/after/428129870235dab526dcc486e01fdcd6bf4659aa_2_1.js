function() {
															if (this.overlay) {
																this.overlay.setAttribute('style','opacity:1.0;background-color:' + bb.options.bb10HighlightColor +';');
															}
															itemNode.fingerDown = true;
															itemNode.contextShown = false;
															if (itemNode.contextMenu) {
																window.setTimeout(this.touchTimer, 667);
															}
														}