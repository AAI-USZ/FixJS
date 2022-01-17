function(key, val) {
            addMarker(buildingLayer, val.longitude, val.latitude, val.buildingID,val.name);    
            latDestination=val.latitude;
            lonDestination=val.longitude;
        }