function(ctx, building, srv, graphicLayers, typeData)
{
	this.renderSize = 32;
	this.data = building;
	this.buildingType = typeData.building[this.data.buildingTypeId];
	
	mixin(
		new TooltippingObject(
			new ObjectRenderingParameters(
				-this.renderSize * 0.5,
				-this.renderSize * 0.5,
				0.0,
				this.renderSize, 
				this.renderSize, 
				1.0, 
				GraphicsType.IMAGE, 
				"images/buildings/" + this.buildingType.canonicalName + ".png" 
			),
			1,
			graphicLayers.tooltip,
			ctx
		),
		this);
	
	this.orp.verticalAnchor = Anchor.BOTTOM;
	this.orp.horizontalAnchor = Anchor.RIGHT;
	this.tooltipObject.setText(this.buildingType.name + "\n" + this.buildingType.description);
	
	if(this.buildingType.industrialHubRange != 0) {
		var self = this;
		this.mouseCursor = "pointer";
		this.mousePressed = function(coords) {
			var itemStorage = new ItemStorageWindow(this.data, srv, typeData, graphicLayers, ctx);
			graphicLayers.gui.addChild(itemStorage);
		};
	}
}