function() {
					this.itemClicked = false;
					this.visible = true;
					var tabOverflowBtn = this.actionBar.tabOverflowBtn;
					this.tabOverflowState.display = tabOverflowBtn.tabHighlight.style.display;
					this.tabOverflowState.img = tabOverflowBtn.icon.src;
					this.tabOverflowState.caption = tabOverflowBtn.display.innerHTML;
					this.tabOverflowState.style = tabOverflowBtn.icon.getAttribute('class');
					this.setDimensions();					
					// Reset our overflow menu button
					tabOverflowBtn.reset();
				}