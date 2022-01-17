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
						} else if (this.mouseOver){
							if (this.parent.classes.indexOf('cursor_pointer') == -1){
								// console.log(this.id + ' is setting the cursor');
								this.parent.classes.push('cursor_pointer');
								this.css.cursor = 'pointer';
							}
						}
					} else if (this.parent.classes.indexOf('cursor_pointer') != -1){
						// console.log(this.id + ' removing css cursor');
						var index = this.parent.classes.indexOf('cursor_pointer');
						this.parent.classes.splice(index, 1);
						delete this.css.cursor;
					}
					this.clicked = false;
					this.mouseOver = false;
				} else if (!this.mouseOver && this.parent.classes.indexOf('cursor_pointer') != -1){
					var index = this.parent.classes.indexOf('cursor_pointer');
					this.parent.classes.splice(index, 1);
				}
			}
		}