function(map, layer, callback) {
        var selectedFeature = layer.selectedFeatures && layer.selectedFeatures[0];
        var setAlpha = this._setAlpha;
        var extent = map.getExtent().scale(1.5);
        var geoJSON = new OpenLayers.Format.GeoJSON();
        var WKT = new OpenLayers.Format.WKT();
        var bbox = geoJSON.write(extent.clone().transform(layer.projection,
                       new OpenLayers.Projection('EPSG:4326')).toGeometry());

        var zoom = map.getZoom();
        var min_length = 100 * Math.pow(2, 0 - zoom);
        var myDataToken = Math.random();
        layer.dataToken = myDataToken;

        var page_endpoint = SaplingMap.api_endpoint + 'page/';

        var process_geom_data = function (geoms) {
            if(layer.dataToken != myDataToken)
            {
                return;
            }
            layer.dataExtent = extent;
            var temp = new olwidget.InfoLayer(geoms);
            temp.visibility = false;
            map.addLayer(temp);
            layer.removeAllFeatures();
            if(selectedFeature)
            {
              layer.addFeatures(selectedFeature);
              layer.selectedFeatures = [selectedFeature];
            }
            $.each(temp.features, function(index, feature) {
              feature.map = map;
              if(selectedFeature && selectedFeature.geometry.toString() == feature.geometry.toString())
                  return;
              layer.addFeatures(feature);
            });
            map.removeLayer(temp);
            if(callback){
                callback();
            }
        }

        var add_geom_items = function (data, geom_type, geom_items) {
            // Convert returned GeoJSON into WKT for olWidget
            for (var i=0; i<data.objects.length; i++) {
                var item = data.objects[i];
                var page_url = item.page.slice(page_endpoint.length - 1);
                var page_name = decodeURIComponent(page_url.slice(1)).replace('_', ' ');
                var geom_html = '<a href="' + page_url + '">' + page_name + '</a>';
                var geom_wkt = WKT.extractGeometry(geoJSON.read(item[geom_type], 'Geometry'));
                geom_items.push([geom_wkt, geom_html]);
            }
        }

        var geom_items = [];

        /* TODO: make this one request by adding OR support to tastypie? */
        $.getJSON(SaplingMap.api_endpoint + 'map/', {'polys__intersects': bbox, 'length__gte': min_length}, function (data) {
            add_geom_items(data, 'polys', geom_items); 
            $.getJSON(SaplingMap.api_endpoint + 'map/', {'lines__intersects': bbox, 'length__gte': min_length}, function (data) {
                add_geom_items(data, 'lines', geom_items); 
                if (zoom >= 14) {
                    $.getJSON(SaplingMap.api_endpoint + 'map/', {'points__intersects': bbox}, function (data) {
                        add_geom_items(data, 'points', geom_items); 
                        process_geom_data(geom_items);
                    });
                }
                else {
                    process_geom_data(geom_items);
                }
            });
        });
    }