function() {
		var i, k, tl = this.tl,
			images = tl.images,
			ctx = tl.ctx,
			start = Math.round(this.startx),
			end = Math.round(this.endx),
			top = tl.height - tl.sliderHeight;
		
		ctx.drawImage(images.sliderLeft, start, top);
		ctx.save();
		ctx.translate(start + tl.sliderHandleWidth, top);
		ctx.fillStyle = ctx.createPattern(images.sliderMid, "repeat-x");
		ctx.fillRect(0, 0, Math.ceil(this.width) - 2*tl.sliderHandleWidth, tl.sliderHeight);
		ctx.restore();
		ctx.drawImage(images.sliderRight, end - tl.sliderHandleWidth, top);
	}