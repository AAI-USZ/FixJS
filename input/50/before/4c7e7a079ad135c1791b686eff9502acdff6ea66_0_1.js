function placeAllMarkers(data){
	for(var i in data){
	    MapApplet.addLocation(data[i]);
	}
    }