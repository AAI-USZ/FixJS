function init_gpx_layer(map, name, file_id, ready_callback) {
    file = "GPX__"+file_id+".gpx"
    
    // Add the Layer with the GPX Track
    var lgpx = new OpenLayers.Layer.GML(name+" "+file_id, file, {
            format: OpenLayers.Format.GPX,
            style: {strokeColor: "red", strokeWidth: 5, strokeOpacity: 1},
            projection: new OpenLayers.Projection("EPSG:4326")
    });

    map.addLayer(lgpx);
    
    lgpx.events.register("loadend", lgpx , function (e) {
        if (ready_callback == undefined)
            zoomTo(map, lgpx, false)
        else
            ready_callback(map, lgpx)
    });
    
    return lgpx
}