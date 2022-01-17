function(area) { 
    	displayedArea = area;
		locationGraphics = new ObjectContainer(0);
	    tooltipGraphics = new OverlayContainer(100);

		renderer.clearChildren();
	    renderer.addChild(locationGraphics);
	    renderer.addChild(tooltipGraphics);
    	
		if( displayedArea != null ) {
    		srv.get("geography/Location", { "areaId": displayedArea.id }, locationsLoaded);
    	}
    }