function() {
	Mojo.Log.info("CLEARMAP ");
	//--> Deletes ALL Markers, not favorites
	for (e=0; e<markers.length; e++){
		if (!markers[e].place.favorite) { 
			markers[e].setMap(null);
			markers.remove(e);
		};
	}

	//--> Deletes ALL infoBubbles
	for (e=0; e<infoBubbles.length; e++){
		infoBubbles[e].setMap(null);
	}
	infoBubbles.length = 0;
	//markers.length = 0;

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