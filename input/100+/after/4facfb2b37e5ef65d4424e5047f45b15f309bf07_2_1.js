function(ctx, transform)
{
	if(!this.rendered)
		return;
	
	this.extraEffects(this.preTransformEffects, transform);
	
	transform.translate(this.orp.x, this.orp.y);
	transform.rotate(this.orp.angle);

	this.extraEffects(this.preRenderEffects, transform);
	
	var selfDrawn = false;
	var myBoundaries = this.calculateBoundaries();
	var c = this.children.firstElement;
	while( c != null ) {
		if( c.zIndex >= 0 && !selfDrawn ) {
			this.drawSelf(ctx, transform, myBoundaries);
			selfDrawn = true;
		}

		c.render(ctx, this.createStartingTransformOfChild(c, transform, myBoundaries));
		c = c.nextElement;
	}

	if(!selfDrawn)
		this.drawSelf(ctx, transform, myBoundaries);
	
	this.lastUsedTransform = transform;

	this.extraEffects(this.postRenderEffects, transform);
}