function(ctx, building, buildingTypes, tooltipContainer)
{
	this.renderSize = 32;
	this.data = building;
	this.buildingTypes = buildingTypes;
	
	mixin(
		new TooltippingObject(
			new ObjectRenderingParameters(
				-this.renderSize,
				-this.renderSize,
				0.0,
				this.renderSize, 
				this.renderSize, 
				1.0, 
				GraphicsType.IMAGE, 
				"images/buildings/" + buildingTypes[building.buildingTypeId].canonicalName + ".png" 
			),
			1,
			tooltipContainer,
			ctx
		),
		this);
	
	this.orp.verticalAnchor = Anchor.BOTTOM;
	this.orp.horizontalAnchor = Anchor.RIGHT;
	this.tooltipObject.setText(this.buildingTypes[this.data.buildingTypeId].name + "\n" + this.buildingTypes[this.data.buildingTypeId].description);
}