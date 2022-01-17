function() {
	if(this.deleted)
		return;

	var tl = this.tl,
		ctx = tl.ctx,
		shape = this.getShape();
		
	// is it on the screen
	if(shape.x + shape.width >= tl.view.startPixel && shape.x <= tl.view.endPixel) {

		ctx.save();
		ctx.font = this.tl.segmentFontSize + ' sans-serif';
		ctx.textBaseline = 'top';
		
		if(this.selected){
			this.renderImage(shape, tl.segmentLeftSel, tl.segmentRightSel, tl.segmentMidSel);
		}else if(!this.selectable){
			this.renderImage(shape, tl.segmentLeftDark, tl.segmentRightDark, tl.segmentMidDark);
		}else{
			this.renderImage(shape, tl.segmentLeft, tl.segmentRight, tl.segmentMid);
		}
		// Set the clipping bounds
		ctx.beginPath();
		ctx.moveTo(shape.x, shape.y);
		ctx.lineTo(shape.x, shape.y + shape.height);
		ctx.lineTo(shape.x + shape.width - tl.segmentFontPadding, shape.y + shape.height);
		ctx.lineTo(shape.x + shape.width - tl.segmentFontPadding, shape.y);
		ctx.closePath();
		ctx.clip();
		
		ctx.fillStyle = tl.segmentTextColor;
		ctx.fillText(this.text, shape.x + (	tl.direction == "ltr"?
											tl.segmentFontPadding:
											shape.width - tl.segmentFontPadding	),
								shape.y + tl.segmentFontPadding	);
					
		ctx.restore();
	}else{
		debugger;
	}
}