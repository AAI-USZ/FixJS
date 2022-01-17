function() {
					// call the parent function
					this.parent();
					// update animation if necessary
					if (this.visible && !this.animationpause && (this.fpscount++ > this.animationspeed)) {
						this.setAnimationFrame(++this.current.idx);
						this.fpscount = 0;
						
						// switch animation if we reach the end of the strip
						// and a callback is defined
						if ((this.current.idx == 0) && this.resetAnim)  {
							// if string, change to the corresponding animation
							if (typeof(this.resetAnim) == "string")
								this.setCurrentAnimation(this.resetAnim);
							// if function (callback) call it
							else if (typeof(this.resetAnim) == "function")
								this.resetAnim();
						}
						return true;
					}
					return false;
				}