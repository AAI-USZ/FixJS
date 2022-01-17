function(idx, mapData){
        // Get metadata about the map from MapBox
        wax.tilejson(mapData.url, function(tilejson) {
            tilejson.attribution += mapBoxAdditAttribution;
            var mapboxstreet = new wax.leaf.connector(tilejson);

            layersControl.addBaseLayer(mapboxstreet, mapData.label);

            // only add default layer to map
            if(idx === 0 && !custAdded) {
                map.addLayer(mapboxstreet);
            } else if (idx === mapboxMaps.length && custAdded) {
                map.addLayer(mapboxstreet);
                $("input[name=leaflet-base-layers]").attr('checked', true);
            }
        });
    }