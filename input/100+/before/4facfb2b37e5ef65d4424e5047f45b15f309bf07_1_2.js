function(dom, domClass, srv, areaControl) {
    var canvas = dom.byId("viewportCanvas");
    var ctx = canvas.getContext("2d");
    var renderer = new Renderer(canvas, ctx, "#000000");
	var mouse = new Mouse(canvas, renderer);
	var keyboard = new Keyboard(); 
	var cameraController = new CameraController(keyboard, mouse, renderer);
    
    var displayedArea = null;
	var locationGraphics = null;
    var tooltipGraphics = null;
	
    var locationObjects = {};
    var buildingObjects = {};
    var locationTypes = {};
    var buildingTypes = {};
    
    areaControl.addAreaSelectionListener(function(area) { 
    	displayedArea = area;
		locationGraphics = new ObjectContainer(0);
	    tooltipGraphics = new OverlayContainer(100);

		renderer.clearChildren();
	    renderer.addChild(locationGraphics);
	    renderer.addChild(tooltipGraphics);
    	
		if( displayedArea != null ) {
    		srv.get("geography/Location", { "areaId": displayedArea.id }, locationsLoaded);
    	}
    });
    
    srv.get("geography/LocationType", {}, function(result) {
    	locationTypes = srv.mapify(result.content.locationTypes);
    });

    srv.get("industry/BuildingType", {}, function(result) {
    	buildingTypes = srv.mapify(result.content.buildingTypes);
    });
    
    var ticker = new Ticker(25);
    ticker.addListener(renderer);
    ticker.addListener(cameraController);
    ticker.addListener(keyboard);
    ticker.addListener(mouse);
    
    function locationsLoaded(result) {
    	locationObjects = {};
    	for(i in result.content.locations) {
    		var l = result.content.locations[i];
    		locationObjects[l.id] = new LocationObject(ctx, l, locationTypes, tooltipGraphics); 
    		locationGraphics.addChild(locationObjects[l.id]);
    	}
    	
    	srv.get("industry/Building", { areaId: displayedArea.id }, buildingsLoaded);
    }
    
    function buildingsLoaded(result) {
    	buildingObjects = {};
    	for(i in result.content.buildings) {
    		var b = result.content.buildings[i];
    		buildingObjects[b.id] = new BuildingObject(ctx, b, buildingTypes, tooltipGraphics);
    		locationObjects[b.locationId].addChild(buildingObjects[b.id]);
    	}
    }
    
    return {
    };
}