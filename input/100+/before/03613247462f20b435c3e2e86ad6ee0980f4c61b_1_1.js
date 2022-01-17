function(){
			if (this.parent.activeScreen){
				if (this.clickMap.length == 0){
					this.makeClickMap();
				}
				
				if (this.clicked || this.mouseOver){
					var mouse = g.input.mouse;
					//Translate the mouse position so that it is relative to the sprite
					var x = mouse.X - this.left - parseInt($('#origins').css('left'));
					var y = mouse.Y - this.top - parseInt($('#origins').css('top'));
					
					if (this.clickMap[x][y] == 1){
						if(this.clicked){
							this.onClick();
						}
						if (this.mouseOver){
							this.css.cursor = 'pointer';
						}
					} else if (this.css.cursor){
						delete this.css.cursor;
					}
					this.clicked = false;
					this.mouseOver = false;
				} else if (!this.mouseOver && this.css.cursor){
					delete this.css.cursor;
				}
			}
		}