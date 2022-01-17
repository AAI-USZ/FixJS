function (command) {

	      switch (command) {
         case 'do-street':
            this.StreetView();
            break;
         case 'do-marker-info':
			this.markerInfo(this.clickedMarker);
            break;
         case 'do-origin':
         	// switch to GetDirections panel if we haven't
         	if ( this.DirectionsButtonModel.label != $L("Get Directions >")) {
				this.DirectionsButtonModel.label = $L("Get Directions >");
				this.controller.modelChanged(this.DirectionsButtonModel);
				$('DirectionsInput').show();
				$('DirectionsPanel').hide();
			};
            this.origin = this.clickedMarker.marker.getPosition();
            this.firstinsertposition = true;
            this.controller.get("OriginSearchField").value = this.clickedMarker.title;
            this.controller.get("OriginSearchField").blur();
            //launch a Directions (upon user feedback)
            this.Directions();
        	break;
         case 'do-destination':
         	// switch to GetDirections panel if we haven't
         	if ( this.DirectionsButtonModel.label != $L("Get Directions >")) {
				this.DirectionsButtonModel.label = $L("Get Directions >");
				this.controller.modelChanged(this.DirectionsButtonModel);
				$('DirectionsInput').show();
				$('DirectionsPanel').hide();
			};

            this.destination = this.clickedMarker.marker.getPosition();
            this.controller.get("DestinationSearchField").value = this.clickedMarker.title;
            this.controller.get("DestinationSearchField").blur();
            //launch a Directions (upon user feedback)
            this.Directions();
         	break;
         case 'do-marker-remove':
			this.clickedMarker.marker.setMap(null);
			this.clickedMarker.infoBubble.setMap(null);
         	break;
      }
}