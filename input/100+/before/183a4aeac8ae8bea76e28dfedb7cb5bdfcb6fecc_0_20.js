function() {
	Mojo.Log.info("CLEARMAP ");
	//--> Deletes ALL Markers
	for (e=0; e<this.markers.length; e++){
		this.markers[e].setMap(null);
	}

	//--> Deletes ALL infoBubbles
	for (e=0; e<this.infoBubbles.length; e++){
		this.infoBubbles[e].setMap(null);
	}
	this.infoBubbles.length = 0;
	this.markers.length = 0;

	// clear all route points and markers
	this.clearDirectPoints();
	
	// clear nearby POI's markers
	this.clearNearbyMarkers();

	this.directionsDisplay.setMap(null);

	 // switch to GetDirections panel if we haven't
     if ( this.DirectionsButtonModel.label != $L("Get Directions >")) {
		this.DirectionsButtonModel.label = $L("Get Directions >");
		this.controller.modelChanged(this.DirectionsButtonModel);
		$('DirectionsInput').show();
		$('DirectionsPanel').hide();
	 };

	 // change the cmd menu to normal
	 this.ChangeCmdMenu("normal");

	 this.DirectStep = 0;

	 this.origin = this.MyLocation;
	 this.destination = null;

	 this.controller.get("OriginSearchField").value = $L("My Location");
	 this.controller.get("DestinationSearchField").value = "";

	 //reset the view menu text
     this.feedMenuModel.items[1].items[1].label = $L("Google Maps");
     this.controller.modelChanged(this.feedMenuModel);
}