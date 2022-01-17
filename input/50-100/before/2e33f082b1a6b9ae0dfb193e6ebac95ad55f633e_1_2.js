function(data) {
       // var latDestination;
       // var lonDestination;
       markerFeatures=new Array();
        $.each(data.building, function(key, val) {
            addMarker(buildingLayer, val.longitude, val.latitude, val.buildingID,val.categoryID);    
            latDestination=val.latitude;
            lonDestination=val.longitude;
        });
        showMapDirectPopup();                
    }