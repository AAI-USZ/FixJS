function(e){
	
	this.setStatusPanel($L("Zooming..."));	
	this.GestureCenter = this.map.getCenter();	
	this.Zooming = true;
	this.previouszoom = this.map.getZoom();
	this.previousScale = e.scale;
	this.previousS = 0;

}