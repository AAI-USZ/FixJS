function() {
	if(this.deleted)
		return;

	this.tl.ctx.font = this.tl.segmentFontSize + ' sans-serif';
	this.tl.ctx.textBaseline = 'top';

	var shape = this.getShape();
		
	// is in on the screen
	if(shape.x + shape.width >= this.tl.view.startPixel && shape.x <= this.tl.view.endPixel) {
		if(this.selected)
			this.renderImage(shape, this.tl.segmentLeftSel, this.tl.segmentRightSel, this.tl.segmentMidSel);
		else if(!this.selectable)
			this.renderImage(shape, this.tl.segmentLeftDark, this.tl.segmentRightDark, this.tl.segmentMidDark);
		else
			this.renderImage(shape, this.tl.segmentLeft, this.tl.segmentRight, this.tl.segmentMid);
		
		// Set the clipping bounds
		this.tl.ctx.save();
		this.tl.ctx.beginPath();
		this.tl.ctx.moveTo(shape.x, shape.y);
		this.tl.ctx.lineTo(shape.x, shape.y + shape.height);
		this.tl.ctx.lineTo(shape.x + shape.width - this.tl.segmentFontPadding, shape.y + shape.height);
		this.tl.ctx.lineTo(shape.x + shape.width - this.tl.segmentFontPadding, shape.y);
		this.tl.ctx.closePath();
		this.tl.ctx.clip();
		
		this.tl.ctx.fillStyle = this.tl.segmentTextColor;

		if(this.tl.direction == "ltr") {
			this.tl.ctx.fillText(this.text, shape.x + this.tl.segmentFontPadding, shape.y + this.tl.segmentFontPadding);
		} else {
			this.tl.ctx.fillText(this.text, shape.x + shape.width - this.tl.segmentFontPadding, shape.y + this.tl.segmentFontPadding);
		}
					
		this.tl.ctx.restore();
	}else{
		throw "Segment Offscreen";
	}
}