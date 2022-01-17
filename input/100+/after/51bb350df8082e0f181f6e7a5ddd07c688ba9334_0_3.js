function() {
		var tl = this.tl,
			images = tl.images,
			ctx = tl.ctx,
			start = this.startx,
			end = this.endx - tl.sliderHandleWidth;
		
		
		ctx.save();
		ctx.translate(0, tl.height - tl.sliderHeight);
		ctx.drawImage(images.sliderLeft, start, 0);
		ctx.drawImage(images.sliderRight, end, 0);
		ctx.fillStyle = ctx.createPattern(images.sliderMid, "repeat-x");
		ctx.fillRect(start + tl.sliderHandleWidth, 0, end - start - tl.sliderHandleWidth, tl.sliderHeight);
		ctx.restore();
	}