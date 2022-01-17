function placeAllMarkers(data){
	clearAllMarkers();
	for(var i in data){
	    MapApplet.addLocation(data[i]);
	}
    }