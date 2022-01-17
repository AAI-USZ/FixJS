function() {
		var i, ctx = this.ctx,
			view = this.view,
			zoom = view.zoom,
			text, textwidth, power,
			hours, mins, secs, msecs, pixels,
			start, end, position, increment;
		
		ctx.font         = 'italic '+this.keyFontSize+' sans-serif';
		ctx.textBaseline = 'top';
		ctx.fillStyle    = this.keyTextColor;
		ctx.strokeStyle    = this.keyTextColor;

		// Adjust the time increment so we don't get numbers on top of numbers
		power = Math.ceil(Math.log(ctx.measureText(" 0:00:00").width*zoom/1000)/0.6931471805599453);
		increment = 1000*Math.pow(2,power);
		pixels = increment/zoom;
		if(power < 0){
			if(pixels < ctx.measureText(" 0:00:00."+(power===-1?"0":(power===-2?"00":"000"))).width){
				increment*=2;
				pixels*=2;
			}
		}
		
		start = view.startTime;
		start -= start%increment;
		end = view.endTime;
		
		for (msecs = start, position = this.timeToPixel(start); msecs < end; msecs += increment, position += pixels) {
			secs = Math.round(msecs) / 1000;

			// Draw the tick
			ctx.beginPath();
			ctx.moveTo(position, this.keyTop);
			ctx.lineTo(position, this.keyTop + this.keyHeight);
			ctx.stroke();

			// Now put the number on
			mins = Math.floor(secs / 60);
			secs %= 60;
			hours = Math.floor(mins / 60);
			mins %= 60;
			
			ctx.fillText(
				hours + (mins<10?":0":":") + mins + (secs<10?":0":":") + secs,
				(this.direction == "ltr") ? position + 2 : position - 2,
				this.keyTop + 2
			);
		}
	}