function(data) {         
         var lonlat = new OpenLayers.LonLat(data.building[0].longitude, data.building[0].latitude).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));         
         var popup= new OpenLayers.Popup(feature.id,
                   lonlat,
                   null,
                   data.building[0].name,
                   true,
                   function(){closePopup()});
        popup.autoSize=true;
        popup.setBackgroundColor('#444');
        feature.popup=popup; 
        feature.popup.contentHTML='<h1>' + data.building[0].name + '</h1><p>' + data.building[0].description + '<span class="moreInfo">More info...</span></p>';
        
        map.addPopup(feature.popup);
        showPopup(feature.popup);
        markerFeatures[feature.id]=feature;              
    }