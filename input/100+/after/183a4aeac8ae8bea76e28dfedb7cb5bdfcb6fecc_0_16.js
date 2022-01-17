function (event) {

this.WebOS2Events('start');

this.controller.toggleMenuVisible(Mojo.Menu.viewMenu);

$('searchScrim').hide();

this.searching = false;

	this.IsSet = true;

	// loose focus
	this.controller.get('MainSearchField').blur();

	 var place = this.Mainautocomplete.getPlace();
			//Mojo.Log.info("** PLACE %j***", this.Mainautocomplete.getPlace());

          try {
            this.map.fitBounds(place.geometry.viewport);
          } catch (error) {
            //this.map.setCenter(place.geometry.location);
            this.map.setZoom(17);
          };

          var address = '';
          if (place.address_components) {
            address = [(place.address_components[0] &&
                        place.address_components[0].short_name || ''),
                       (place.address_components[1] &&
                        place.address_components[1].short_name || ''),
                       (place.address_components[2] &&
                        place.address_components[2].short_name || '')
                      ].join(' ');
          }
          //Mojo.Log.info("** PLACE %j***", place);

		 try {
			 if (this.isTouchPad()) {
				// specify actual center (for TP is this needed)
				this.ActualCenter = place.geometry.location;
				};
				
			  //Mojo.Log.info("** PLACE ID %j***", place.id);
			  //place marker
			  this.PlaceMarker({position: place.geometry.location, title: place.name, subtitle: address, place: place, popbubble: true});

			  //update the view menu text
			  this.feedMenuModel.items[1].items[1].label = place.name;
			  this.controller.modelChanged(this.feedMenuModel);
		  } catch (error) {};
          
          //start the listener for keypress
          this.controller.listen(this.controller.stageController.document, 'keydown', this.KeypresseventHandler);


}