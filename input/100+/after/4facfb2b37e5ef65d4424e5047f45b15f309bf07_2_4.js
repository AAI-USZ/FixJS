function(child, originalTransform, myBoundaries) {
	var childTransform = originalTransform.clone();
	var trans = {x: myBoundaries.centerX, y: myBoundaries.centerY};
	if(child.orp.horizontalAnchor == Anchor.LEFT)
		trans.x += - 0.5 * this.orp.width;
	else if(child.orp.horizontalAnchor == Anchor.RIGHT)
		trans.x += 0.5 * this.orp.width;

	if(child.orp.verticalAnchor == Anchor.TOP)
		trans.y += - 0.5 * this.orp.height;
	else if(child.orp.verticalAnchor == Anchor.BOTTOM)
		trans.y += 0.5 * this.orp.height;
		
	childTransform.translate(trans.x, trans.y);
	
	return childTransform;
}