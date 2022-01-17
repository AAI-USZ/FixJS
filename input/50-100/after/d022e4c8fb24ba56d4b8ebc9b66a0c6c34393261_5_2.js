function() {
		if(this.repeatA != null) {
			var left = this.timeToPixel(this.repeatA),
				right = this.timeToPixel(this.repeatB),
				ctx = this.ctx;
			ctx.save();
			ctx.fillStyle = this.abRepeatOn?this.abRepeatColor:this.abRepeatColorLight;
			ctx.fillRect(left, 0, right-left, this.height);
			ctx.restore();
		}
	}