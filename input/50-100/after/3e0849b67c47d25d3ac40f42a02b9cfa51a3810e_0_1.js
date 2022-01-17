function(wisemlParameter, parentDiv) {
	this.wiseml = wisemlParameter;
	this.origin;
	this.predLat = "http://www.w3.org/2003/01/geo/wgs84_pos#lat";
	this.predLong = "http://www.w3.org/2003/01/geo/wgs84_pos#long";
	this.nodes = new Array();
	this.markersArray;
	this.map;
	this.infoWindow = new google.maps.InfoWindow();

	this.view = null;

	this.parse();
	this.buildView(parentDiv);

}