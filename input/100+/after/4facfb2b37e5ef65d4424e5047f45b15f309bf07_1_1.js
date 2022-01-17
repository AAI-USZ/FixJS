function(area) { 
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
    }