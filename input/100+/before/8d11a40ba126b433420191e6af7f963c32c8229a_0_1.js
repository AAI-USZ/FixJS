function() {
		//this.stop().animate("blink", 10, -1);
		
		if(this.facing === "up") {
			theJump = this.y + Crafty.viewport.y - 18;
			if(theJump <= this.jumpDist){
				this.y -= theJump;
			} else {
				this.y -= this.jumpDist;
			}
		} else if (this.facing === "down") {
			theJump = Crafty.viewport.y - this.y + 18;
			if(theJump <= this.jumpDist){
				this.y += theJump;
			} else {
				this.y += this.jumpDist;
			}
		} else if (this.facing === "right") {
			theJump = Crafty.viewport.x - this.x + 18;
			if(theJump <= this.jumpDist){
				this.x += theJump;
			} else {
				this.x += this.jumpDist;
			}
		} else {
			theJump = this.x + Crafty.viewport.x - 18;
			if(theJump <= this.jumpDist){
				this.x -= theJump;
			} else {
				this.x -= this.jumpDist;
			}
		}

		//this.timeout(function() {
		//	this.stop().animate("blinkin", 10, -1)
		//}, 100);
	}