function() {
					this.itemClicked = false;
					var tabOverflowBtn = this.actionBar.tabOverflowBtn;
					this.tabOverflowState.display = tabOverflowBtn.tabHighlight.style.display;
					this.tabOverflowState.img = tabOverflowBtn.icon.src;
					this.tabOverflowState.caption = tabOverflowBtn.display.innerHTML;
					this.tabOverflowState.style = tabOverflowBtn.icon.getAttribute('class');
		
					var width = (bb.device.isPlayBook) ? bb.innerWidth() - 77 : bb.innerWidth() - 154;
					// Set our screen's parent to have no overflow so the browser doesn't think it needs to scroll
					this.screen.parentNode.style.position = 'absolute';
					this.screen.parentNode.style.left = '0px';
					this.screen.parentNode.style.top = '0px';
					this.screen.parentNode.style.bottom = '0px';
					this.screen.parentNode.style.right = '0px';
					this.screen.parentNode.style.width = bb.innerWidth()+'px';
					this.screen.parentNode.style['overflow'] = 'hidden';
					// Make our overlay visible
					this.overlay.style.display = 'block';
					// Show our menu
					this.style.width = width + 'px';
					this.style['-webkit-transition'] = 'all 0.3s ease-out';
					this.style['-webkit-backface-visibility'] = 'hidden';
					// Slide our screen
					this.screen.style.left = width + 'px';
					this.screen.style.right = '-' + width +'px';
					this.screen.style['-webkit-transition'] = 'all 0.3s ease-out';
					this.screen.style['-webkit-backface-visibility'] = 'hidden';
					// Reset our overflow menu button
					tabOverflowBtn.reset();
				}