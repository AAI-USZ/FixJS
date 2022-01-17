function() {
	var tl = this.tl,
		ctx = tl.ctx,
		top = tl.height - tl.toolbarHeight - tl.sliderHeight,
		width = this.width - tl.sliderLeft.width - tl.sliderRight.width;
	
	if(width < 0)
		width = 0;
	
	ctx.drawImage(tl.sliderLeft, this.x, top);
	ctx.drawImage(tl.sliderMid, this.x + tl.sliderLeft.width, top, width, tl.sliderHeight);
	ctx.drawImage(tl.sliderRight, this.x + width + tl.sliderLeft.width, top);
}