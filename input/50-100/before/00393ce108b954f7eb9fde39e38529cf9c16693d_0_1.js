function(){
			var mouse = g.input.mouse;
			//Translate the mouse position so that it is relative to the sprite
			var x = mouse.X - this.left - parseInt($('#origins').css('left'));
			var y = mouse.Y - this.top - parseInt($('#origins').css('top'));
			
			if (this.clickMap[x][y] == 1){
				if(mouse.click){
					this.clicked = true;
				}
				//Return true if the mouse is at least over clickable area
				return true;
			}
			return false;
		}