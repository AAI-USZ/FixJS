function(options) {
            var map = mapbox.map(el);
            if (options.layer) map.addLayer(options.layer);
            if (options.markers) map.addLayer(options.markers);
            if (options.attribution) wax.mm.attribution(map, options).appendTo(map.parent);
            if (options.legend) wax.mm.legend(map, options).appendTo(map.parent);
            wax.mm.zoomer(map).appendTo(map.parent);
            wax.mm.zoombox(map);
            map.zoom(options.zoom)
                .center(options.center);
            wax.mm.interaction()
                .map(map)
                .tilejson(options)
                .on(wax.tooltip().parent(map.parent).events());
            map.tileSize = { x: 128, y: 128 };
            if (callback) callback(map);
        }