function () {
        var geo_eu = init_geoportail_EU_layer(map)
        map.addLayers([
            //init_geoportail_base_layer(),
            geo_eu
            ])
        map.setLayerIndex(geo_eu, 0)
    }