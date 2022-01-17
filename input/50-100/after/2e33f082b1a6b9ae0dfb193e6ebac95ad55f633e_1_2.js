function(data) {
       // var latDestination;
       // var lonDestination;
       markerFeatures=new Array();
        $.each(data.building, function(key, val) {
            addMarker(buildingLayer, val.longitude, val.latitude, val.buildingID,val.name);    
            latDestination=val.latitude;
            lonDestination=val.longitude;
        });
        showMapDirectPopup();                
    }