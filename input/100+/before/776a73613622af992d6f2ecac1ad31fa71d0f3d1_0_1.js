function OpenViaRemote() {
    if (selectedFeature != null)
    {
        var from = new OpenLayers.Projection("EPSG:900913");
        var to = new OpenLayers.Projection("EPSG:4326");
        var bounds = selectedFeature.geometry.getBounds().toArray()
        var p1 = (new OpenLayers.LonLat(bounds[0], bounds[1])).transform(from, to);
        var p2 = (new OpenLayers.LonLat(bounds[2], bounds[3])).transform(from, to);
        $.get("http://127.0.0.1:8111/load_and_zoom", {left: p1.lon, right: p2.lon, top: p2.lat, bottom: p1.lat});
    }
}