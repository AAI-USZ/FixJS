function (action) {
	
	this.blockTPPan = true;
	
	//index the nearby markers as "relevance"
	for (var i = 0; i < this.Nearbymarkers.length; i++) {
		this.Nearbymarkers[i].place.relevance = i;
	};
	
	//index the markers as "relevance" and add distance from actual location
	for (var i = 0; i < markers.length; i++) {
		markers[i].place.relevance = i;
		markers[i].place.distance = google.maps.geometry.spherical.computeDistanceBetween(this.MyLocation, markers[i].place.geometry.location);
	};
	
	this.MyLocationMarker = [];
	
	this.MyLocationMarker.place = [];
	this.MyLocationMarker.place.geometry = [];
	this.MyLocationMarker.place.geometry.location = this.MyLocation;
	this.MyLocationMarker.place.name = $L("My Location");
	this.MyLocationMarker.place.vicinity = "";

	var MarkersArray = [];
	MarkersArray.action = action;
	
	MarkersArray[0] = this.Nearbymarkers; //nearby markers
	MarkersArray[1] = markers; //markers - found places
	MarkersArray[2] = this.MyLocationMarker; //My Location marker
	MarkersArray[3] = this.Favorites //favorites markers

	
	this.controller.stageController.pushScene({'name': 'markers-list', transition: Mojo.Transition.none}, MarkersArray);
}