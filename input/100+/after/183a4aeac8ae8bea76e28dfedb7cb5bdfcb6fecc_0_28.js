function (event) {
	
	Mojo.Log.info("** DOWN X*** %j", event.down.x);
	Mojo.Log.info("** DOWN Y*** %j", event.down.y);
	this.setStatusPanel($L("Dropping a pin..."));
	
	//var MarkerPoint = this.overlay.getProjection().fromLatLngToContainerPixel(latlng);
	var point = new google.maps.Point(event.down.x, event.down.y);
	//Mojo.Log.info("** POINT*** %j", point);
	var taplatlng = this.overlay.getProjection().fromContainerPixelToLatLng(point);
	//var taplatlng = this.overlay.getProjection().fromDivPixelToLatLng(point);
	this.inputstring = taplatlng.toUrlValue(4);
	this.setTopBarText(this.inputstring);
	this.holdaction = "droppin";
	this.DropPin(taplatlng);
}