function(data) {         
         var lonlat = new OpenLayers.LonLat(data.Building[0].longitude, data.Building[0].latitude).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));         
         var popup= new OpenLayers.Popup(feature.id,
                   lonlat,
                   null,
                   data.Building[0].name,
                   true);    
        popup.autoSize=true;
        popup.setBackgroundColor('#444');
        feature.popup=popup; 
        feature.popup.contentHTML=data.Building[0].name
        +'</br><button onclick="routeTo('+data.Building[0].longitude+','+data.Building[0].latitude+')">Route</button>';
        map.addPopup(feature.popup);
        showPopup(feature.popup);
        markerFeatures[feature.id]=feature;              
    }