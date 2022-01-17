function(data){
						if (data) {
							this.header.style.display = '';
							if (data.title) {
								this.topTitle.innerHTML = data.title;
							}
							if (data.description) {
								this.description.innerHTML = data.description;
							}
							this.selected = data;
						} else {
							this.header.style.display = 'none';	
							this.selected = undefined;							
						}
						this.peeking = false;
						this.overlay.style.display = 'inline';
						this.style['-webkit-transition'] = 'all 0.3s ease-in-out';
						this.style['-webkit-transform'] = 'translate(-' + bb.contextMenu.getWidth() + 'px, 0)';	
						this.addEventListener("touchstart", this.touchHandler, false);		
						// Remove the header click handling while peeking
						this.header.addEventListener("click", this.hide, false);	
					}