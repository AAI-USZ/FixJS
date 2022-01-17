function buildingsLoaded(result) {
    	buildingObjects = {};
    	for(i in result.content.buildings) {
    		var b = result.content.buildings[i];
    		buildingObjects[b.id] = new BuildingObject(ctx, b, buildingTypes, tooltipGraphics);
    		locationObjects[b.locationId].addChild(buildingObjects[b.id]);
    	}
    }