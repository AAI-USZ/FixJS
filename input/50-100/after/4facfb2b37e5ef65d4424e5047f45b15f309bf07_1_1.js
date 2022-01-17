function locationsLoaded(result) {
    	locationObjects = {};
    	for(i in result.content.locations) {
    		var l = result.content.locations[i];
    		locationObjects[l.id] = new LocationObject(ctx, l, typeData.location, graphicLayers.tooltip); 
    		graphicLayers.location.addChild(locationObjects[l.id]);
    	}
    	
    	srv.get("industry/Building", { areaId: displayedArea.id }, buildingsLoaded);
    }