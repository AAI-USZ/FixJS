function(tilejson) {
            tilejson.handle = $(el).attr('id');
            layers[tilejson.handle] = tilejson;
            // As soon as first map is loaded, build it and
            // attach updateMap handler to all layer controls.
            if (i == 0) {
                var updateMap = buildMap(tilejson);
                $('.share .tilejson textarea').text(url(id));
                $('.share .embed textarea').text("<iframe style='background-color: #000' width='500' height='300' frameBorder='0' src='http://a.tiles.mapbox.com/v3/" + id + ".html#11,40.7010,-74.0137'></iframe>");
                $('#layer-switcher li .title').click(function() {;
                    var id = $(this).parent().attr('id');
                    updateMap(layers[id]);
                    $('.share .tilejson textarea').empty().text(url(layers[id].id));
                    $('.share .embed textarea').empty().text("<iframe style='background-color: #000' width='500' height='300' frameBorder='0' src='http://a.tiles.mapbox.com/v3/" + layers[id].id + ".html#11,40.7010,-74.0137'></iframe>");
                    return false;
                });
            }
        }