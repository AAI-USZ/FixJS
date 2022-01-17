function addMarker(layer, lon, lat, id) {
    var lonlat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
    var size = new OpenLayers.Size(25,41);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('img/marker.png', size, offset);

    var feature = new OpenLayers.Feature(layer, lonlat); 
    feature.data.icon = icon;
    feature.data.overflow = 'auto';
    feature.id = id;              
    var marker = feature.createMarker();   
    markerFeatures[id] = feature;
    marker.events.register('mousedown', feature, markerClick);    
    layer.addMarker(marker);
}