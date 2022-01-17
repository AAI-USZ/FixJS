function() {
		if(this.repeatA != null) {
			var left = this.timeToPixel(this.repeatA);
			var right = this.timeToPixel(this.repeatB);
			if(this.abRepeatOn == true)
				this.ctx.fillStyle = this.abRepeatColor;
			else
				this.ctx.fillStyle = this.abRepeatColorLight;
			this.ctx.fillRect(left, 0, right-left, this.height - this.sliderHeight);
		}
	}