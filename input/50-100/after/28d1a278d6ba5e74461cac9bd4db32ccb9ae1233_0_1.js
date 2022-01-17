function(tilejson) {
            tilejson.handle = $(el).attr('id');
            layers[tilejson.handle] = tilejson;
            // As soon as first map is loaded, build it and
            // attach updateMap handler to all layer controls.
            if (i == 0) {
                var updateMap = buildMap(tilejson);
                $('#layer-switcher li .title').click(function() {;
                    updateMap(layers[$(this).parent().attr('id')]);
                    return false;
                });
            }
        }