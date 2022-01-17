function() {
	this.lastPointedAtObject = this.pointedAtObject;
	this.pointedAtObject = this.renderer.findTopmostObjectAtCoordinates(this.current);
	
	if(this.pointedAtObject != this.lastPointedAtObject) {
		if(this.lastPointedAtObject != null && this.lastPointedAtObject.mouseExit != null)
			this.lastPointedAtObject.mouseExit(this.current);

		if(this.pointedAtObject != null && this.pointedAtObject.mouseEnter != null)
			this.pointedAtObject.mouseEnter(this.current);
	}
	

	if(this.pointedAtObject != null) {
		if(this.mousePressed && this.pointedAtObject.mousePressed != null)
			this.pointedAtObject.mousePressed(this.current);
		
		if(this.pointedAtObject.mouseCursor != null)
			document.body.style.cursor = this.pointedAtObject.mouseCursor;
	} 
}