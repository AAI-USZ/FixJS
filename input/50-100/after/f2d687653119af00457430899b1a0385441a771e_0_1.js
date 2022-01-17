function add_geoportail_layer(map) {
    return;
    var ready = function () {
        var geo_eu = init_geoportail_EU_layer(map)
        map.addLayers([
            //init_geoportail_base_layer(),
            geo_eu
            ])
        map.setLayerIndex(geo_eu, 0)
    }
    
    Geoportal.GeoRMHandler.getConfig(['1711091050407331029'], null,null, {
        onContractsComplete: ready
    });
}