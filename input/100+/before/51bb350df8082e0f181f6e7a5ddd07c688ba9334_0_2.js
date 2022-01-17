function(pos) {
		var diff;
		if(this.active) {
			diff = pos.x - this.tl.mouseDownPos.x;
			switch(this.resizeSide){
				case -1:
					this.x = Math.min(Math.max(this.startingX + diff,0), this.startingX+this.startingWidth-this.tl.sliderHandleWidth*3);
					//, this.startingX+this.startingWidth - 1800*this.tl.width/this.tl.length);
					this.width = this.startingWidth + (this.startingX - this.x);
					break;
				case 0: this.x = this.startingX + diff;
					break;
				case 1: this.width = this.startingWidth + diff;
			}
			this.tl.render();
		}
	}