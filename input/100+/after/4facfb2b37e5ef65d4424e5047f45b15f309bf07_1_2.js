function(dom, domClass, srv, areaControl) {
    var canvas = dom.byId("viewportCanvas");
    var ctx = canvas.getContext("2d");
    var renderer = new Renderer(canvas, ctx, "#000000");
	var mouse = new Mouse(canvas, renderer);
	var keyboard = new Keyboard(); 
	var cameraController = new CameraController(keyboard, mouse, renderer);
    
    var graphicLayers = {location: null, gui: null, tooltip: null};
    var typeData = {location: {}, building: {}, item: {}}
	var displayedArea = null;
	
    var locationObjects = {};
    var buildingObjects = {};
    
    areaControl.addAreaSelectionListener(function(area) { 
    	displayedArea = area;
    	graphicLayers.location = new ObjectContainer(0);
    	graphicLayers.gui = new OverlayContainer(50, canvas);
    	graphicLayers.tooltip = new OverlayContainer(100, canvas);

		renderer.clearChildren();
	    renderer.addChild(graphicLayers.location);
	    renderer.addChild(graphicLayers.gui);
	    renderer.addChild(graphicLayers.tooltip);
    	
		if( displayedArea != null ) {
    		srv.get("geography/Location", { "areaId": displayedArea.id }, locationsLoaded);
    	}
    });
    
    srv.get("geography/LocationType", {}, function(result) {
    	typeData.location = srv.mapify(result.content.locationTypes);
    });

    srv.get("industry/BuildingType", {}, function(result) {
    	typeData.building = srv.mapify(result.content.buildingTypes);
    });
    
    srv.get("industry/ItemType", {}, function(result) {
    	typeData.item = srv.mapify(result.content.itemTypes);
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
    		locationObjects[l.id] = new LocationObject(ctx, l, typeData.location, graphicLayers.tooltip); 
    		graphicLayers.location.addChild(locationObjects[l.id]);
    	}
    	
    	srv.get("industry/Building", { areaId: displayedArea.id }, buildingsLoaded);
    }
    
    function buildingsLoaded(result) {
    	buildingObjects = {};
    	for(i in result.content.buildings) {
    		var b = result.content.buildings[i];
    		buildingObjects[b.id] = new BuildingObject(ctx, b, srv, graphicLayers, typeData);
    		locationObjects[b.locationId].addChild(buildingObjects[b.id]);
    	}
    }
    
    return {
    };
}