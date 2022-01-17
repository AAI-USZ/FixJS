function init_map() {
    var map = loadMap("map_search")
    return
    var markers = new OpenLayers.Layer.Markers("Tags");
    map.addLayer(markers);
    
    map.events.register("click", map , function(e){
        if (last_point != null)
            markers.removeMarker(last_point)
        var opx = map.getLonLatFromPixel(e.xy) ;
        var marker = new OpenLayers.Marker(opx);
        markers.addMarker(marker);
        last_point = marker
        
        var pos = map.getLonLatFromViewPortPx(e.xy)
        pos.transform( map.projection,map.displayProjection);
        updateLocation(pos.lat, pos.lon)
    });
}