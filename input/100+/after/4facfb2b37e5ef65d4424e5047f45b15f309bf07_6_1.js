function(ctx, tooltipString, tooltipContainer)
{
	mixin(new WindowObject(0, 0, 0, 0), this); 
	
	this.rendered = false;
	tooltipContainer.addChild(this);
	
	var self = this;
	
	this.tickSelf = function(tickInterval) {
		if(this.displayAfter == null)
			return;
		
		self.orp.x = self.mouseCoords.x;
		self.orp.y = self.mouseCoords.y;
		
		if(new Date().getTime() > self.displayAfter) {
			self.displayAfter = null;
			self.rendered = true;
		}
	};
	this.orp.verticalAnchor = Anchor.TOP;
	this.orp.horizontalAnchor = Anchor.LEFT;
	this.textObject = new TextObject(ctx, 0, 0, tooltipString, "11px Arial", "#00ffff", 14, 160); 
	this.addChild(this.textObject);
}