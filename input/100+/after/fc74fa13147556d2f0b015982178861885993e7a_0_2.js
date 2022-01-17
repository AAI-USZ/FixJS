function routeTo (lon,lat) {
    activePopup.toggle();
    //get route JSON
      var url = '/REST/transport.json?url=http://www.yournavigation.org/api/1.0/gosmore.php&format=geojson&'+
        'flat='+myLat+'&'+
        'flon='+myLon+'&'+
        'tlat='+lat+'&'+
        'tlon='+lon+
        '&v=foot&fast=0&layer=mapnik';      
       
        //draw route   
    myRouteVector.destroyFeatures();   
    var routeStyle = { strokeColor: '#0000ff', 
            strokeOpacity: 0.5,
            strokeWidth: 5
    };        
    $.get(url, function(data) { 
        var previouslonpos=0;
        var previouslatpos=0; 
         $.each(data.coordinates, function(num,latlonpos) {
            if(previouslatpos==0){
                previouslonpos=latlonpos[0];
                previouslatpos=latlonpos[1];
            }
            else{               
                var start_point = new OpenLayers.Geometry.Point(previouslonpos,previouslatpos); 
                var end_point = new OpenLayers.Geometry.Point(latlonpos[0],latlonpos[1]);
                previouslonpos=latlonpos[0];
                previouslatpos=latlonpos[1];
                
                myRouteVector.style=routeStyle;
                myRouteVector.addFeatures([new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([start_point, end_point]).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")))]);     
            }
         });
    });
}