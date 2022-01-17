function(event) {
								this.centerMenuItems();
								// Resize the menu if it is currently open
								if (this.visible) {
									this.setDimensions();
								}
							}