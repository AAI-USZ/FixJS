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
        feature.popup.contentHTML='<h1 class="' + data.building[0].catName + '">' + data.building[0].name + '</h1><p class="description">' + data.building[0].description + '<br /><br /><br /></p><p class="adres ' + data.building[0].catName + '">' + data.building[0].adres + '</p>';
        
        map.addPopup(feature.popup);
        showPopup(feature.popup);
        markerFeatures[feature.id]=feature;              
    }