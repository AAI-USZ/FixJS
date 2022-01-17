function(zIndex, canvas)
{
	mixin(new ObjectContainer(zIndex), this);
	this.canvas = canvas;

	this.createStartingTransformOfChild = function(child, originalTransform) {
		var childTransform = new Transform();
		var trans = {x: 0, y: 0};
		
		if(child.orp.horizontalAnchor == Anchor.LEFT)
			trans.x = 0;
		else if(child.orp.horizontalAnchor == Anchor.RIGHT)
			trans.x = this.canvas.width;
		else
			trans.x = this.canvas.width * 0.5;
			
		if(child.orp.verticalAnchor == Anchor.TOP)
			trans.y = 0;
		else if(child.orp.verticalAnchor == Anchor.BOTTOM)
			trans.y = this.canvas.height;
		else
			trans.y = 0.5 * this.canvas.height;
			
		childTransform.translate(trans.x, trans.y);
		
		return childTransform;
	};

}