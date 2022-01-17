function() {
		if(this.alignClock === undefined)
			this.startAnimation(-1, this.getCurrentPosition() + 1);
		else {
			var pos = -this.movable.getPositionX() / this.getLayoutWidth();
			if(this.animNext > pos)
				this.startAnimation(-1 * (this.animNext+1-this.getCurrentPosition()), Math.min(this.animNext + 1, this.box.getChildren().length - 1));
			else
				this.startAnimation(-1, Math.min(Math.ceil(pos), this.box.getChildren().length - 1));
		}
	}