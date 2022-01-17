function() {

Ares.setupSceneAssistant(this);

//Check internet connectivity at first
this.checkConnectivity();



/* SETUP UI WIDGETS */

//setup directions panel scroller

this.controller.setupWidget("DirectionsPanelScroller",
  this.attributes = {
      mode: 'vertical'
  },
  this.DirectionsPanelScrollerModel = {
      snapElements: {
      x: []
      }
  }
);

if (this.isTouchPad()) {
	// set height of scroller for TP
	var listheight = Math.round(this.controller.window.innerHeight*0.84) + "px";
	document.getElementById("DirectionsPanelScroller").style.maxHeight = "620px";
	// TP as onlyone WebOS device support optimized markers in newest gAPI v3
	this.optimizedmarkers = true;
} else {
	// set height of scroller depends on device resolution
	var listheight = Math.round(this.controller.window.innerHeight*0.7) + "px";
	document.getElementById("DirectionsPanelScroller").style.maxHeight = listheight;
	// Older WebOS devices doesn't support optimized markers in newest gAPI v3
	this.optimizedmarkers = false;
	};

//setup toggle button directions type

this.controller.setupWidget("DirectType",
  this.attributes = {
      choices: [
          {label: $L("Drive"), value: "driving"},
          {label: $L("Walk"), value: "walking"},
        //  {label: "Pub.", value: 3}, not at this time
          {label: $L("Bike"), value: "bicycling"}
      ]
  },
  this.model = {
      value: "driving",
      disabled: false
  }
);

this.DirectTypeEventHandler = this.DirectType.bindAsEventListener(this);
this.DirectType = this.controller.get('DirectType');
Mojo.Event.listen(this.DirectType, Mojo.Event.propertyChange, this.DirectTypeEventHandler);

//setup get directions buttons

this.controller.setupWidget("GetDirectionsButton",
  this.attributes = {
  },
  this.DirectionsButtonModel = {
      label : $L("Get Directions >"),
      disabled: false
  }
);

this.GetDirectionsButtonEventHandler = this.GetDirectionsButtonTap.bindAsEventListener(this);
this.GetDirectionsButton = this.controller.get('GetDirectionsButton');
Mojo.Event.listen(this.GetDirectionsButton, Mojo.Event.tap, this.GetDirectionsButtonEventHandler);


//setup Origin Markers button listener

this.OriginMarkersButtonEventHandler = this.OriginMarkersButtonTap.bindAsEventListener(this);
this.OriginMarkersButton = this.controller.get('OriginMarkersButton');
Mojo.Event.listen(this.OriginMarkersButton, Mojo.Event.tap, this.OriginMarkersButtonEventHandler);

//setup Destination Markers button listener

this.DestinationMarkersButtonEventHandler = this.DestinationMarkersButtonTap.bindAsEventListener(this);
this.DestinationMarkersButton = this.controller.get('DestinationMarkersButton');
Mojo.Event.listen(this.DestinationMarkersButton, Mojo.Event.tap, this.DestinationMarkersButtonEventHandler);

//setup map hold listener

this.MapHoldEventHandler = this.MapHold.bindAsEventListener(this);
this.MapHold = this.controller.get('map_canvas');
Mojo.Event.listen(this.MapHold, Mojo.Event.hold, this.MapHoldEventHandler);


//setup TP Back buttons

this.controller.setupWidget("TPBackButton",
  this.attributes = {
  },
  this.BackButtonModel = {
      label : "Back",
      disabled: false
  }
);

this.TPBackButtonEventHandler = this.handleBackSwipe.bindAsEventListener(this);
this.TPBackButton = this.controller.get('TPBackButton');
Mojo.Event.listen(this.TPBackButton, Mojo.Event.tap, this.TPBackButtonEventHandler);

this.controller.setupWidget("TPBackButtonD",
  this.attributes = {
  },
  this.BackButtonModel
);

this.TPBackButtonD = this.controller.get('TPBackButtonD');
Mojo.Event.listen(this.TPBackButtonD, Mojo.Event.tap, this.TPBackButtonEventHandler);

// setup loading spinner

this.controller.setupWidget("LoadingSpinner",
  this.attributes = {
      spinnerSize: "large"
  },
  this.LoadApiModel = {
      spinning: true
  }
);

// setup status panel spinner

this.controller.setupWidget("StatusPanelSpinner",
  this.attributes = {
      spinnerSize: "small"
  },
  this.StatusPanelSpinnerModel = {
      spinning: true
  }
);

//Observe a Swap button element in Directions input
this.SwapDirectionsHandler = this.SwapDirections.bindAsEventListener(this);
this.controller.get('SwapButton').observe(Mojo.Event.tap, this.SwapDirectionsHandler);

//Set localized HTML texts
this.setLocalizedHTML();

this.setStatusPanel($L("Loading Maps..."));

// --- test EVENETS help function for me
/*
 var gestures = [
         'click',
         'dragstart',
         'dragfinish',
         'drag',
         'drop',
         'dragover',
         'dragout',
         'mousedown',
         'mousehold',
         'mouseholdpulse',
         'mousemove',
         'mouseout',
         'mouseover',
         'mouserelease',
         'mouseup',
         'touchstart',
         'touchmove',
         'touchend',
         'touchcancel'];
      for (var g in gestures) {
         document.addEventListener(gestures[g], function(event) {
             Mojo.Log.info("*** EVENT TEST ***",event.type);
         }, true);
      };

*/


	this.$.gps1.startTracking();
	
	this.setStatusPanel($L("Waiting for your location..."));

	/* vsechny normalni pristroje az na Pre3 maji rozdil pro velikost menu 170 */
	this.widthadd = 170-60;
	this.heightadd = 170-60;
	
	//Puvodne jsem to prirazoval natvrdo, tohle je obecnejsi, ziskat pixel ratio (Pre3 1.5, ostatni 1.0)
	this.ScreenRoughRatio = this.controller.window.devicePixelRatio;
	
	if(this.isPre3()){
		Mojo.Log.info("*** Detected device is Pre3 ***");
		this.widthadd = (330-60);
		this.heightadd = (440-60);
		this.restmenuwidth = Mojo.Environment.DeviceInfo.screenWidth - this.widthadd;
	} else {
		/* hodnota zbytku menu */
		this.restmenuwidth = this.controller.window.innerWidth - this.widthadd;
		};


	this.createMenu();

	
	this.GPSFix = false;

	//setup geocoder
	this.geocoder = new google.maps.Geocoder();

	//setup map
	this.MyLocation = new google.maps.LatLng(37.39281, -122.04046199999999);
	
	//if this is enabled, the poi's on the map are disabled
	var mapStyles =[
    {
        featureType: "all",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
	];
	
this.mapStyleNight = [
[
  {
    stylers: [
      { saturation: -73 },
      { visibility: "simplified" }
    ]
  }
],
[
  {
    featureType: "road",
    stylers: [
      { hue: "#dd00ff" }
    ]
  },{
    featureType: "water",
    stylers: [
      { hue: "#00f6ff" },
      { lightness: -18 },
      { saturation: 62 }
    ]
  },{
    featureType: "landscape",
    stylers: [
      { hue: "#ffc300" },
      { saturation: 63 },
      { lightness: -16 }
    ]
  }
],
[
  {
    elementType: "geometry",
    stylers: [
      { gamma: 3.16 }
    ]
  },{
    featureType: "transit",
    stylers: [
      { visibility: "on" },
      { hue: "#ff0008" },
      { saturation: 95 },
      { lightness: -40 }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  },{
    featureType: "water",
    stylers: [
      { saturation: 59 },
      { lightness: -8 }
    ]
  }
],
[
  {
    stylers: [
      { invert_lightness: true }
    ]
  }
]
];

    var myOptions = {
        zoom: 2,
        center: this.MyLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scaleControl: true,
        maxZoom: 20,
        minZoom: 1,
        //styles: mapStyleNight[3],
      	draggable: false	
    };
    this.map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	this.MapType = this.MapCookie.get();
	
	if (this.MapType == undefined)  {
		this.ActualMapType = [true, false, false, false];
		Mojo.Log.info("DEFAULT:" , this.MapType);
		} else {
			//this.MapType.remove();
			Mojo.Log.info("Cookie MapType:" , this.MapType);
			try {
				this.handlePopMapType(this.MapType);
				}
			catch (error) {
				Mojo.Log.info("Layers cookie not properly defined, revert to default", error);
				this.MapCookie.remove();
				this.MapType = "Roadmap";
				this.MapCookie.put(this.MapType);
				this.handlePopMapType(this.MapType);
				};
		};
		
	// Setup the overlay to use for projections (pixels to latlng and vice versa, etc...)
	this.overlay = new google.maps.OverlayView();
	this.overlay.draw = function() {};
	this.overlay.setMap(this.map); 

	/** Setup the Preferences variables */
	
	this.Preferences = this.PrefsCookie.get();
	Mojo.Log.info("PREFERENCES: %j" , this.Preferences);
	
	if (this.Preferences == undefined)  {
		this.Preferences = DefaultPreferences;
		this.PrefsCookie.put(this.Preferences);
		} else {
			try {
				this.checkAllPreferences(this.Preferences);
				//this.setPrefsWidgets(this.Preferences);
				}
			catch (error) {
				Mojo.Log.info("Preferences not properly defined, revert to default", error);
				this.PrefsCookie.remove();
				this.Preferences = DefaultPreferences;
				this.PrefsCookie.put(this.Preferences);
				//this.setPrefsWidgets(this.Preferences);
				};
		};
		
	this.controller.enableFullScreenMode(this.Preferences.Fullscreen);
	
	//Load a Favorites from Mojo.Depot
	this.getFavorites();
	
	
    // Na pozdeji implementace jinych mapovych podkladu napr. openstreetmaps
    /*
    this.map.mapTypes.set("Google", new google.maps.ImageMapType({
                getTileUrl: function(coord, zoom) {
                    return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "OpenStreetMap",
                maxZoom: 18
            }));
    */

    	// setup autocompleter for main search
		this.MainInput = "";
		this.MainInput = document.getElementById("MainSearchField");
        this.Mainautocomplete = new google.maps.places.Autocomplete(this.MainInput);
        this.Mainautocomplete.bindTo('bounds', this.map);

        new google.maps.event.addListener(this.Mainautocomplete, 'place_changed', this.SelectedPlace.bind(this));


        // setup autocompleter for origin search
		this.OriginInput = "";
		this.OriginInput = document.getElementById("OriginSearchField");
        this.Originautocomplete = new google.maps.places.Autocomplete(this.OriginInput);
        this.Originautocomplete.bindTo('bounds', this.map);

        new google.maps.event.addListener(this.Originautocomplete, 'place_changed', this.SelectedOriginPlace.bind(this));

        // setup autocompleter for destination search
		this.DestinationInput = "";
		this.DestinationInput = document.getElementById("DestinationSearchField");
        this.Destinationautocomplete = new google.maps.places.Autocomplete(this.DestinationInput);
        this.Destinationautocomplete.bindTo('bounds', this.map);

        new google.maps.event.addListener(this.Destinationautocomplete, 'place_changed', this.SelectedDestinationPlace.bind(this));

    //Setup arrays to hold our markers and infoBubbles and other variables
    //this.markers = [];
	//this.infoBubbles = [];
	this.DirectinfoBubbles = [];
	this.Directmarkers = [];
	this.DirectStep = 0;
	this.NearbyinfoBubbles = [];
	this.Nearbymarkers = [];
	this.NearbyStep = 0;
	this.blockTPPan = false;
	this.isdragging = false;
	this.wasflicked = true;
	this.Pre3refreshcounter = 0;
	this.isNavit = false;
	//this.Favorites = [];

	// map doesn't follow GPS as default
	this.followMap = false;

	//setup direction service
    var rendererOptions = {
  		map: this.map,
  		suppressMarkers: true,
  		suppressInfoWindows: true,
  		draggable: false,
		}
    this.directionsService = new google.maps.DirectionsService();
	this.directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	this.directionsDisplay.setPanel(document.getElementById('directions-panel'));
	
	//this.TrafficVisibile = false;
    this.trafficLayer = new google.maps.TrafficLayer();

	// load cookie for traffic layer
	this.TrafficVisibile = this.TrafficCookie.get();
	Mojo.Log.info("TRAFFIC:" , this.TrafficVisibile);
	if (this.TrafficVisibile == undefined)  {
		this.TrafficVisibile = false;
		this.TrafficCookie.put(true);
		} else {
			try {
					this.Traffic();					
				}
			catch (error) {				
					Mojo.Log.info("Cookie not properly defined, revert to default", error);
					this.TrafficCookie.remove();
					this.TrafficCookie.put(false);
					this.TrafficVisibile = false;
				  }
			  
		};
		
	//Setup Bycicling layer
    this.bikeLayer = new google.maps.BicyclingLayer();
    this.BikeVisibile = this.Preferences.Bike;
    if (this.BikeVisibile) {this.bikeLayer.setMap(this.map)};
    
	//Setup Weather layer
	this.weatherLayer = new google.maps.weather.WeatherLayer({
		suppressInfoWindows: true
	});
	this.WeatherVisibile = this.Preferences.Weather;
	if (this.WeatherVisibile) {this.weatherLayer.setMap(this.map)};
		
	//Setup Cloud Layer
	this.cloudLayer = new google.maps.weather.CloudLayer();
	this.CloudVisibile = this.Preferences.Cloud;
	if (this.CloudVisibile) {this.cloudLayer.setMap(this.map)};
	
	//Setup Night Style
	this.NightVisibile = this.Preferences.Night;
	if (this.NightVisibile) {
		var styleoptions = {
		styles: this.mapStyleNight[3]
		};
			this.map.setOptions(styleoptions);
	};
	
	//Set to last view
	var lastlatlng = new google.maps.LatLng(this.Preferences.LastLoc.lat, this.Preferences.LastLoc.lng);
	this.map.setCenter(lastlatlng);
	this.map.setZoom(this.Preferences.LastLoc.zoom);
	
	/*
	//Setup Panoramio Layer
	var panoramioOptions = {
		suppressInfoWindows: true,
		optimized: false
	};
	var panoramioLayer = new google.maps.panoramio.PanoramioLayer(panoramioOptions);
	panoramioLayer.setMap(this.map);
	*/
	
 	new google.maps.event.addListener(this.map, 'idle', this.MapIdle.bind(this));
 	new google.maps.event.addListener(this.map, 'tilesloaded', this.MapTilesLoaded.bind(this));
 	new google.maps.event.addListener(this.map, 'bounds_changed', this.MapCenterChanged.bind(this));
 	//new google.maps.event.addListener(this.map, 'projection_changed', this.ProjectionChanged.bind(this));
 	new google.maps.event.addListener(this.map, 'overlaycomplete', this.OverlayComplete.bind(this));
 	this.CenterChanged = true;
 	
 	// stop mousemove propagation
	//this.map.getDiv().addEventListener('drag', function(evt) {
	//	evt.stopPropagation();
	//});
 	
 	new google.maps.event.addDomListener(document.getElementById('map_canvas'), 'resize', this.Resize.bind(this));
 	
 	//key press listener
 	this.KeypresseventHandler = this.Keypress.bindAsEventListener(this);
	this.controller.listen(this.controller.stageController.document, 'keydown', this.KeypresseventHandler);
	this.KeyWasPressed = false;
	
	//searchfield key press listener
 	this.SearchKeypresseventHandler = this.SearchKeypress.bindAsEventListener(this);
	this.controller.listen(document.getElementById('MainSearchField'), 'keydown', this.SearchKeypresseventHandler);
	this.SearchKeyWasPressed = false;
	
	//searchfield onpaste listener
 	this.SearchPasteeventHandler = this.SearchPaste.bindAsEventListener(this);
	this.controller.listen(document.getElementById('MainSearchField'), 'paste', this.SearchPasteeventHandler);

  	// Map Pinch to Zoom lisetener
	Mojo.Event.listen(this.controller.get("map_canvas"), "gesturestart", this.handleGestureStart.bindAsEventListener(this));
	Mojo.Event.listen(this.controller.get("map_canvas"), "gesturechange", this.handleGestureChange.bindAsEventListener(this));
	Mojo.Event.listen(this.controller.get("map_canvas"), "gestureend", this.handleGestureEnd.bindAsEventListener(this));
	//Mojo.Event.listen(this.controller.get("map_canvas"), "click", this.click.bindAsEventListener(this));

	//setup dragging listeners
	this.dragStartHandler = this.dragStart.bindAsEventListener(this);
	//this.dragEndHandler = this.dragEnd.bindAsEventListener(this);
	this.draggingHandler = this.dragging.bindAsEventListener(this);
	this.flickHandler = this.flick.bindAsEventListener(this);


	// TODO: mousedown event is needed by hiding the command menu
	//Mojo.Event.listen(this.controller.get("map_canvas"), 'mousedown', this.mousedownHandler.bind(this));
	
	//Check if Navit is installed, needs FileMgr service
	new Mojo.Service.Request('palm://ca.canucksoftware.filemgr', {
 				method: 'exists',
 				parameters: {
 					file: "/media/cryptofs/apps/usr/palm/applications/org.webosinternals.navit"
 				},
 				onSuccess: function(payload) {
 					this.isNavit = payload.exists;
 					Mojo.Log.info("**** Navit installed:  %j ****", this.isNavit);
 				}.bind(this),
 				onFailure: function(err) {
 					Mojo.Log.info('FileMgrs service is probably not installed or returns error');
 				}
 			});

//******* zjistovani devices *******

/*
Mojo.Log.info("**** VERZE ****", Mojo.Environment.DeviceInfo.platformVersion);
Mojo.Log.info("**** VERZE ****", Mojo.Environment.DeviceInfo.platformVersionMajor);
Mojo.Log.info("**** VERZE ****", Mojo.Environment.DeviceInfo.platformVersionMinor);
Mojo.Log.info("**** VERZE ****", Mojo.Environment.DeviceInfo.platformVersionDot);
//Mojo.Log.info("**** VERZE ****", Mojo.Environment.DeviceInfo.screenWidth);
*/
//*******************************

}