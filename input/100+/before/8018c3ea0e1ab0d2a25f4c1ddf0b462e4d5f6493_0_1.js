function(){
			//Check if any sprites have been clicked
			if (this.fadeIn){
				if (this.css['opacity'] >= 1.0){
					this.css['opacity'] = 1.0;
					this.fadeIn = false;
					this.fadeOut = false;
					this.css['z-index'] = g.topZIndex;
					this.activeScreen = true;
				} else {
					this.css['opacity'] += (1 / this.transitionFrames);
				}
				this.drawState = 'updated';
			} else if (this.fadeOut){
				if (this.css['opacity'] <= 0.0){
					this.css['opacity'] = 0.0;
					this.fadeOut = false;
					this.fadeIn = false;
					this.css['z-index'] = g.bottomZIndex;
					this.activeScreen = false;
				} else {
					this.css['opacity'] -= (1 / this.transitionFrames);
				}
				
				this.drawState = 'updated';
			}
			
			var mouse = {};
			var mouseOverCheck = false;
			//Only take input if the screen is not transitioning
			if (this.activeScreen){
				mouse = g.input.mouse;
			
				for (x in this.spriteArray){
					var testSprite = this.spriteArray[x];
					if (testSprite instanceof clickSprite){
						if ((mouse.X > testSprite.left + parseInt($('#origins').css('left'))) && 
							(mouse.X < testSprite.left + testSprite.width() + parseInt($('#origins').css('left'))) &&
							(mouse.Y > testSprite.top + parseInt($('#origins').css('top'))) &&
							(mouse.Y < testSprite.top + testSprite.height() + parseInt($('#origins').css('top')))){
							
							mouseOverCheck = testSprite.checkMouse();
						}
					}
				}
			}
			
			if(mouseOverCheck){
				this.css.cursor = 'pointer';
			} else {
				this.css.cursor = 'default';
			}
			
			//update sprites if screen is visible.
			//Even if the screen is not active animation may be occuring in the background
			if (this.css['opacity'] > 0.0){
				for (x in this.spriteArray){
					this.spriteArray[x].update();
				}
			}
		}