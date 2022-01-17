function() {
		if(this.alignClock === undefined)
			this.startAnimation(1, this.getCurrentPosition() - 1);
		else {
			var pos = -this.movable.getPositionX() / this.getLayoutWidth();
			if(this.animNext < pos)
				this.startAnimation(1 * (this.getCurrentPosition() - (this.animNext-1)), Math.max(this.animNext - 1, 0));
			else
				this.startAnimation(1, Math.floor(pos));
		}
	}