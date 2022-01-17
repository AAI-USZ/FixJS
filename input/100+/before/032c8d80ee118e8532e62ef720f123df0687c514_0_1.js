function addGPSData(map,gpsData, clickable){
        map.gpsPositions = [];
        map.gpsTimestamps = [];
        if (gpsData.length == 0)
            return;
        map.markers[gpsData[0].type] = [];
        var minLat = 90; //initialized to the largest valid latitude
        var maxLat = 0; //initialized to the smallest valid latitude
        var minLng = 180; //initialized to the largest valid longitude
        var maxLng = -180; //initialized to the smallest valid longitude
        var filtered = 0;
        var avg = 0;
        for (var i = 0; i < gpsData.length; i++){
            if (gpsData[i].accuracy > config.flatAccuracyCutoff || gpsData[i].accuracy == 0){
                filtered++
                continue;
            }
            avg += gpsData[i].accuracy;
        }
        var cutoff = 1000000000;
        if (filtered != gpsData.length){
            avg /= gpsData.length - filtered;
            var std = 0;
            for (var i = 0; i < gpsData.length; i++){
                if (gpsData[i].accuracy > config.flatAccuracyCutoff || gpsData[i].accuracy == 0)
                    continue;
                std += Math.pow(gpsData[i].accuracy - avg,2);
            }
            std /= gpsData.length - filtered;
            std = Math.sqrt(std);
            cutoff = avg + std * config.stdAccuracyCutoff;
        }
        for (var i = 0; i < gpsData.length; i++){
            if (gpsData[i].accuracy > cutoff  || (filtered != gpsData.length && gpsData[i].accuracy == 0)){
                continue;
            }
            var lat = gpsData[i].position[0];
            var lng = gpsData[i].position[1];
            map.gpsPositions[map.gpsPositions.length] = new google.maps.LatLng(lat,lng);
            map.markers[gpsData[i].type][map.markers[gpsData[i].type].length] = new google.maps.Marker({map:map,
                                                                            position:map.gpsPositions[map.gpsPositions.length-1],
                                                                           icon:App.getConnectorConfig(App.getFacetConnector(gpsData[i].type)).mapicon,
                                                                           shadow:App.getConnectorConfig(App.getFacetConnector(gpsData[i].type)).mapshadow,
                                                                           clickable:clickable});
            map.enhanceMarkerWithItem(map.markers[gpsData[i].type][map.markers[gpsData[i].type].length-1],gpsData[i]);
            map.gpsTimestamps[map.gpsTimestamps.length] = gpsData[i].start;
            map.gpsAccuracies[map.gpsAccuracies.length] = gpsData[i].accuracy;
            if (lat < minLat)
                minLat = lat + gpsData[i].accuracy;
            if (lat > maxLat)
                maxLat = lat + gpsData[i].accuracy;
            if (lng < minLng)
                minLng = lng + gpsData[i].accuracy;
            if (lng > maxLng)
                maxLng = lng + gpsData[i].accuracy;
        }
        map.gpsLine = new google.maps.Polyline({map:map, path:map.gpsPositions,clickable:false});
        map.gpsBounds = new google.maps.LatLngBounds(new google.maps.LatLng(minLat,minLng), new google.maps.LatLng(maxLat,maxLng));
        map.noGPSDiv.css("display","none");
    }