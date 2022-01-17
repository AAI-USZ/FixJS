function(args) {
	
	//Mojo.Log.info("*** ACTIVATE *** %j", args);
	
	//start the listener for keypress
    this.controller.listen(this.controller.stageController.document, 'keydown', this.KeypresseventHandler);
          
		try {
				//update a Preferences variables from Cookies after each activate
				this.Preferences = this.PrefsCookie.get();	
				}
			catch (error) {
				Mojo.Log.info("Preferences cookie not properly defined", error);
				};
		
				//resize the map after each focus back
				google.maps.event.trigger(this.map, "resize");


		if (this.LaunchArg.Action != undefined) {
			
				// decode unicode from JustType and unescape possibile HTML
				this.maploc = decodeURIComponent(this.maploc);
				this.mapto = decodeURIComponent(this.mapto);
				this.maploc = this.maploc.unescapeHTML();
				this.mapto = this.mapto.unescapeHTML();
			
				// Override mapto -> maploc if set in Preferences
				if (this.LaunchArg.Action == "mapto" && this.Preferences.MaptoOverride) {
					this.LaunchArg.Action = "maploc";
					this.maploc = this.mapto;
					this.mapto = undefined;
				Mojo.Log.info("*** LAUNCH MAPTO DIRECTIONS AND OVERRIDING TO MAPLOC ***", this.maploc);
				//this.handleMapLoc();
				};
				
				// byla aplikace spustena jako hledani mista?
				if (this.LaunchArg.Action == "maploc" || this.maploc != undefined) {
				this.handleMapLoc();
				};

				// byla aplikace spustena jako navigace na misto?
				if (this.LaunchArg.Action == "mapto" || this.mapto != undefined) {
				Mojo.Log.info("*** LAUNCH MAPTO DIRECTIONS ***", this.mapto);
				this.handleMapTo();
				};
		};

		//Mojo.Log.info("** MAIN ACTIVATE ***");
		// Zarizeni s WebOS 2.2.x potrebuji odchytavat primo eventy z touchscreenu, v activate je to proto aby se aktivovaly odposlouchavace i pri navratu na mapu
		this.WebOS2Events('start');

		// navrat na stred markeru
		if (args != undefined) {
			//Mojo.Log.info("*** ACTION IN ACTIVATE ***", args.action);
				switch (args.action) {

					case "mapto-from-active":
						this.handleMapTo();
					break;		
					case "info":
						this.map.panTo(args.place.geometry.location);
						this.map.setZoom(17);
						
						//block TP pan
						this.blockTPPan = true;
						
						//unblock the TP pan after 2 seconds
						(function(){
								this.blockTPPan = false;
								
						}).bind(this).delay(2);
						
					break;	
					case "origin":
						this.origin = args.place.geometry.location;
						if (args.place.vicinity != "") {
							this.controller.get("OriginSearchField").value = args.place.name + ", " + args.place.vicinity;
						} else {
							this.controller.get("OriginSearchField").value = args.place.name;
						};
					break;
					case "destination":
						this.destination = args.place.geometry.location;
						if (args.place.vicinity != "") {
							this.controller.get("DestinationSearchField").value = args.place.name + ", " + args.place.vicinity;
						} else {
							this.controller.get("DestinationSearchField").value = args.place.name;
						};
					break;
					case "updatefavorites":
						this.updateFavorites(args);
					break;
				
				};
			
			};

			/* zobrazeni mapy s cestou */
  			if (this.bounds != undefined) {
  					this.map.fitBounds(this.bounds);
  					this.bounds = null;
  			};
  			if(this.isTouchPad() == true){
						google.maps.event.trigger(this.map, "resize");
				}
	// hide status panel after activate
	this.hideStatusPanel();
}