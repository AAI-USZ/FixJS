function(event) {
	
	if(event.type == Mojo.Event.commandEnable && (event.command == Mojo.Menu.helpCmd || event.command == Mojo.Menu.prefsCmd)) {
      event.stopPropagation();
    };
                if (event.type === Mojo.Event.command) {
                        if (event.command == 'zoomOut') {
                                        this.map.setZoom(this.map.getZoom() - 1);
                        }
                        if (event.command == 'zoomIn') {
                                        this.map.setZoom(this.map.getZoom() + 1);
                        }
                        if ((event.command == 'forward-step') || (event.command == 'back-step')) {
                                        this.moveOnRoute(event.command);
                        }
                        if (event.command == 'maptype') {
                                         var near = event.originalEvent && event.originalEvent.target;
                                         this.controller.popupSubmenu({
																				  onChoose:  this.handlePopMapType,
																				  placeNear: near,
																				  items: [
																				      {secondaryIconPath:'images/maptype-roadmap.png', label: $L('Roadmap'), command: 'Roadmap', chosen: this.ActualMapType[0]},
																				      {secondaryIconPath:'images/maptype-hybrid.png', label: $L('Hybrid'), command: 'Hybrid', chosen: this.ActualMapType[1]},
																				      {secondaryIconPath:'images/maptype-terrain.png', label: $L('Terrain'), command: 'Terrain', chosen: this.ActualMapType[2]},
																				      {secondaryIconPath:'images/maptype-satellite.png', label: $L('Satellite'), command: 'Satellite', chosen: this.ActualMapType[3]},
																				      {secondaryIconPath:'images/night.png', label: $L('Night'), command: 'do-night', chosen: this.NightVisibile},
																				      {secondaryIconPath:'images/traffic-icon.png', label: $L('Traffic'), command: 'do-traffic', chosen: this.TrafficVisibile},
																				      {secondaryIconPath:'images/bike.png', label: $L('Bike'), command: 'do-bike', chosen: this.BikeVisibile},
																				      {secondaryIconPath:'images/weather.png', label: $L('Weather'), command: 'do-weather', chosen: this.WeatherVisibile},
																				      {secondaryIconPath:'images/cloud.png', label: $L('Clouds'), command: 'do-cloud', chosen: this.CloudVisibile},
																				      
																				  ]
																				});
                        }
                        if (event.command == 'do-about') {
                        								this.controller.stageController.pushScene({'name': 'about'});
                        }
                        if (event.command == 'do-license') {
                        								this.controller.stageController.pushScene({'name': 'license'});
                        }
                        if (event.command == 'searchPlaces') {
                        								this.Search();
                        }
                        if (event.command == 'debug') {
                        								this.Debug();
                        }
                        if (event.command == 'MyLoc') {
                        								this.mylocation();
                        }
                        if (event.command == 'PopMenu') {

                        								var near = event.originalEvent && event.originalEvent.target;
                        								if (!this.Preferences.Fullscreen) {
														this.controller.popupSubmenu({
																				  onChoose:  this.handlePopMenu,
																				  placeNear: near,
																				  items: [
																					  {iconPath:'images/markers-icon.png', label: $L('Markers'), command: 'do-markers'},
																					  {iconPath:'images/direction-icon.png', label: $L('Directions'), command: 'do-direct'},
																				      {iconPath:'images/street.png', label: $L('Street View'), command: 'do-street'},					      
																				      //{iconPath:'images/traffic-icon.png', label: 'Traffic', command: 'do-traffic', chosen: this.TrafficVisibile},
																				      {iconPath:'images/clear-map.png', label: $L('Clear map'), command: 'do-clearmap'}
																				  ]
																				});} else {
																				this.controller.popupSubmenu({
																				  onChoose:  this.handlePopMenu,
																				  placeNear: near,
																				  items: [
																					  {iconPath:'images/exit-fullscreen.png', label: $L('Exit Fullscreen'), command: 'do-fullscreenoff'},
																				      {iconPath:'images/markers-icon.png', label: $L('Markers'), command: 'do-markers'},
																					  {iconPath:'images/direction-icon.png', label: $L('Directions'), command: 'do-direct'},
																				      {iconPath:'images/street.png', label: $L('Street View'), command: 'do-street'},
																				      //{iconPath:'images/traffic-icon.png', label: 'Traffic', command: 'do-traffic', chosen: this.TrafficVisibile},
																				      {iconPath:'images/clear-map.png', label: $L('Clear map'), command: 'do-clearmap'}
																						  ]
																						});
																					};
                        }
                        if (event.command == 'searchDone') {
                        								this.zoom();
                        }
                        if (event.command == Mojo.Menu.prefsCmd) {
                        	this.controller.stageController.pushScene({'name': 'preferences'}, this.PrefsCookie);							
                        }
                        if (event.command == Mojo.Menu.helpCmd) {
                        								
                        }
                };
             
            //handle Back swipe event   
            if (event.type == Mojo.Event.back) {
				this.handleBackSwipe(event);
			}
  }