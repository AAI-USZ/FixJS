function (command) {

	      switch (command) {
         case 'do-street':
			this.setStatusPanel($L("Loading StreetView..."));
            this.StreetView();
            break;
         case 'do-marker-info':
			this.setStatusPanel($L("Loading marker info..."));
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
         case 'do-navit':
			this.setStatusPanel($L("Launching Navit..."), 5);
        	var name=this.clickedMarker.place.name;
        	var pos =this.clickedMarker.marker.getPosition();
			new Mojo.Service.Request('palm://ca.canucksoftware.filemgr', {
 				method: 'write',
 				parameters: {
 					file: "/media/internal/appdata/org.webosinternals.navit/destination.txt",
 					str: 'type=former_destination label="'+ name +'"\nmg: ' + pos.lng() + " " + pos.lat() + "\n",
 					append: true
 				},
 				onSuccess: function(payload) {
 					new Mojo.Service.Request('palm://com.palm.applicationManager', {
 						method: 'open',
 						parameters: {
 							id: 'org.webosinternals.navit',
 							params: {}
 						}
 					});
 				},
 				onFailure: function(err) {
 					Mojo.Controller.errorDialog($L('Set destination to Navit failed'));
 				}
 			}); 
         	break;
         case 'do-marker-remove':
			this.markerRemove(this.clickedMarker);
         	break;
      }
}