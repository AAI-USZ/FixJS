function()
{
	var bounds = {top: 0, left: 0, right: 0, bottom: 0};
	
	if(this.orp.horizontalOrigin == Origin.LEFT) {
		bounds.left = 0;
		bounds.right = this.orp.width;
		bounds.centerX = 0.5 * this.orp.width;
	}
	else if(this.orp.horizontalOrigin == Origin.RIGHT) {
		bounds.left = - this.orp.width;
		bounds.right = 0;
		bounds.centerX = - 0.5 * this.orp.width;
	}
	else {
		bounds.left = -0.5 * this.orp.width;
		bounds.right = 0.5 * this.orp.width;
		bounds.centerX = 0;
	}
	
	if(this.orp.verticalOrigin == Origin.TOP) {
		bounds.top = 0
		bounds.bottom = this.orp.height
		bounds.centerY = 0.5 * this.orp.height;
	}
	else if(this.orp.verticalOrigin == Origin.BOTTOM) {
		bounds.top = - this.orp.height
		bounds.bottom = 0
		bounds.centerY = - 0.5 * this.orp.height ;
	}
	else {
		bounds.top = - 0.5 * this.orp.height
		bounds.bottom = 0.5 * this.orp.height
		bounds.centerY = 0;
	}
	
	return bounds;
}