function(pos) {
		var diff;
		if(this.active) {
			diff = pos.x - this.tl.mouseDownPos.x;
			switch(this.resizeSide){
				case -1:
					this.startx = this.initStart + diff;
					break;
				case 0:
					move.call(this,diff);
					break;
				case 1:
					this.endx = this.initEnd + diff;
			}
			this.tl.render();
		}
	}