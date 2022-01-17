function(){
			
			if (this.activeScreen) {
				if (g.input.key.press){
					this.keyValue = g.input.key.value;
				} else {
					this.keyValue = false;
				}
				
				if (this.nextActiveStatement){
					this.previousActiceStatement = this.activeStatement;
					this.activeStatement = this.nextActiveStatement;
					this.nextActiveStatement = null;
				}
				
				var mouse = g.input.mouse;
				mouse.X -= $('#origins').position().left + parseInt(this.playerCSS.left);
				mouse.Y -= $('#origins').position().top + parseInt(this.playerCSS.top);
				if((mouse.X > 0) && (mouse.X <= parseInt(helper.findCSSRule('.speech').style.width))
					&& (mouse.Y > 0) && (mouse.Y <= parseInt(helper.findCSSRule('.speech').style.height))){
					
					var target = Math.floor(mouse.Y / parseInt(this.responseHolders[0].height));
					
					if (mouse.click) {
						this.activeStatement.clicked = target;
					} else {
						for(var i = 0; i < this.responseHolders.length; i++){
							if(target == i){
								this.responseHolders[i]['background-color'] = '#FFFF88';
							} else {
								this.responseHolders[i]['background-color'] = '#FFFFFF';
							}
						}
					}
				}
				
				this.activeStatement.update();
			}
		}