function() {
	this.lastPointedAtObject = this.pointedAtObject;
	this.pointedAtObject = this.renderer.findTopmostObjectAtCoordinates(this.current);
	
	if(this.pointedAtObject != this.lastPointedAtObject) {
		if(this.lastPointedAtObject != null && this.lastPointedAtObject.mouseExit != null)
			this.lastPointedAtObject.mouseExit(this.current);

		if(this.pointedAtObject != null && this.pointedAtObject.mouseEnter != null)
			this.pointedAtObject.mouseEnter(this.current);
	}
}