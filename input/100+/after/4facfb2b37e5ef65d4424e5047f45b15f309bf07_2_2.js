function(ctx, transform, boundaries)
{
	if( this.orp.graphicsType == GraphicsType.NONE )
		return;
	
	ctx.setTransform(transform.m[0], transform.m[1], transform.m[2], transform.m[3], transform.m[4], transform.m[5]);
	ctx.globalAlpha = this.orp.alpha;
	
	if( this.orp.graphicsType == GraphicsType.IMAGE ) {
		ctx.drawImage(this.orp.content, boundaries.left, boundaries.top, this.orp.width, this.orp.height);
	}
	else if( this.orp.graphicsType == GraphicsType.ANIM ) {
		ctx.drawImage(this.orp.content, 0, this.animationTracker.frameTop, this.image.width, this.orp.frameHeight, -this.orp.offsetX, -this.orp.offsetY, this.orp.width, this.orp.height);
	}
	else if( this.orp.graphicsType == GraphicsType.RECT ) {
		ctx.fillStyle = this.orp.content;
		ctx.fillRect(boundaries.left, boundaries.top, this.orp.width, this.orp.height);
	}
}