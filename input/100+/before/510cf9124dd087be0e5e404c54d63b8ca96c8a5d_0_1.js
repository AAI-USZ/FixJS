function(data) {
	    var latDestination;
	    var lonDestination;
        $.each(data.Building, function(key, val) {
            addMarker(buildingLayer, val.longitude, val.latitude, val.buildingID);     
            latDestination=val.latitude;
            lonDestination=val.longitude;
        });    
        /*
        //get route JSON
        var url = '/map/transport.php?url=http://www.yournavigation.org/api/1.0/gosmore.php&format=geojson&'+
        'flat='+position.coords.latitude+'&'+
        'flon='+position.coords.longitude+'&'+
        'tlat='+latDestination+'&'+
        'tlon='+lonDestination+
        '&v=foot&fast=1&layer=mapnik';
           
               
        //draw route   
        var ol = new OpenLayers.Layer.OSM(); 
        var routeStyle = { strokeColor: '#0000ff', 
                strokeOpacity: 1,
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
		    		var vector = new OpenLayers.Layer.Vector();
		    		vector.style=routeStyle;
		    		vector.addFeatures([new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([start_point, end_point]).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913")))]);
		    		map.addLayers([ol,vector]);        
				}
	         });
        });*/
    }