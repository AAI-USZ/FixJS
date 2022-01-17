function addMarker(layer, lon, lat, id) {
    var lonlat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"),new OpenLayers.Projection("EPSG:900913"));
    var size = new OpenLayers.Size(25,41);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('img/marker.png', size, offset);
    
    var feature = new OpenLayers.Feature(layer, lonlat); 
    feature.data.icon = icon;
    feature.closeBox = true;
    feature.popupClass = OpenLayers.Class(OpenLayers.Popup.FramedCloud, { 'autoSize': true });
    feature.data.popupContentHTML = 'Dit is een test.';
    feature.data.overflow = 'auto';
    feature.id = id;        
            
    var marker = feature.createMarker();

    marker.events.register('mousedown', feature, markerClick);
    /*marker.events.register('mouseover', marker, markerOver);
    marker.events.register('mouseout', marker, markerOut);*/
    
    layer.addMarker(marker);
}