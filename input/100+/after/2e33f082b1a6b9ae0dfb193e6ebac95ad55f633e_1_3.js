function showMapDirectPopup(){    
    if(typeof mapDirect!='undefined'){
        if(markerFeatures[mapDirect].popup==null )
            fillPopup(markerFeatures[mapDirect]);
        if(markerFeatures[mapDirect].popup !=null && !markerFeatures[mapDirect].popup.visible())       
            showPopup(markerFeatures[mapDirect].popup)
        $.getJSON('http://tali.irail.be/REST/Building.json?buildingID='+mapDirect , function(data) {
            
            var lonlatBuilding= new OpenLayers.LonLat(
                data.building[0].longitude,data.building[0].latitude
                ).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
            map.setCenter(lonlatBuilding);
            //map.setCenter(markerFeatures[mapDirect].) 
            
        });
        
        mapDirect=undefined;
    } 
    else map.setCenter(lonlat);   
}