function addMarker(layer, lon, lat, id) {
    var lonlat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
    var size = new OpenLayers.Size(25,41);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('img/marker.png', size, offset);
    
    var popup = new OpenLayers.Popup.FramedCloud("Popup", 
        lonlat, null,
        '<button onclick="routeTo('+lon+','+lat+')">Route</button>'
        , null,
        true // <-- true if we want a close (X) button, false otherwise
    );
    
    popup.hide();
    
    var feature = new OpenLayers.Feature(layer, lonlat); 
    feature.data.icon = icon;
    feature.popup = popup;
    feature.data.overflow = 'auto';
    feature.id = id;        
            
    var marker = feature.createMarker();                             
    map.addPopup(popup);
    markerFeatures[id] = feature;

    marker.events.register('mousedown', feature, markerClick);
    
    layer.addMarker(marker);
}