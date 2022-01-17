function() {
		//this.stop().animate("blink", 10, -1);
		
		if(this.facing === "up") {
			if((this.y + Crafty.viewport.y) >= 320){
				this.jumpDist = this.y - Crafty.viewport.y - 18;
			} else if((this.y + Crafty.viewport.y) <= 0){
				this.jumpDist = Crafty.viewport.y - this.y + 18;
			}
			this.y -= this.jumpDist;
		} else if (this.facing === "down") {
			if((this.y + Crafty.viewport.y) >= 320){
				this.jumpDist = this.y - Crafty.viewport.y - 18;
			} else if((this.y + Crafty.viewport.y) <= 0){
				this.jumpDist = Crafty.viewport.y - this.y + 18;
			}
			this.y += this.jumpDist;
		} else if (this.facing === "right") {
			if((this.x + Crafty.viewport.x) >= 480){
				this.jumpDist = this.x - Crafty.viewport.x - 18;
			} else if((this.x + Crafty.viewport.x) <= 0){
				this.jumpDist = Crafty.viewport.x - this.x - 18;
			}
			this.x += this.jumpDist;
		} else {
			if((this.x + Crafty.viewport.x) >= 480){
				this.jumpDist = this.x - Crafty.viewport.x - 18;
			} else if((this.x + Crafty.viewport.x) <= 0){
				this.jumpDist = Crafty.viewport.x - this.x + 18;
			}
			this.x -= this.jumpDist;
		}

		//this.timeout(function() {
		//	this.stop().animate("blinkin", 10, -1)
		//}, 100);
	}