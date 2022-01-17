function locationsLoaded(result) {
    	locationObjects = {};
    	for(i in result.content.locations) {
    		var l = result.content.locations[i];
    		locationObjects[l.id] = new LocationObject(ctx, l, locationTypes, tooltipGraphics); 
    		locationGraphics.addChild(locationObjects[l.id]);
    	}
    	
    	srv.get("industry/Building", { areaId: displayedArea.id }, buildingsLoaded);
    }