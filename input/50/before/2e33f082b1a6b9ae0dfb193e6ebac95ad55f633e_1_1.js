function(key, val) {
            addMarker(buildingLayer, val.longitude, val.latitude, val.buildingID,val.categoryID);    
            latDestination=val.latitude;
            lonDestination=val.longitude;
        }