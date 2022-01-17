function(map, layer, callback) {
        var selectedFeature = layer.selectedFeatures && layer.selectedFeatures[0];
        var setAlpha = this._setAlpha;
        var extent = map.getExtent().scale(1.5);
        var bbox = extent.clone().transform(layer.projection,
                       new OpenLayers.Projection('EPSG:4326')).toBBOX();
              
        var zoom = map.getZoom();
        var myDataToken = Math.random();
        layer.dataToken = myDataToken;
        $.get('_objects/', { 'bbox': bbox, 'zoom': zoom }, function(data){
            if(layer.dataToken != myDataToken)
            {
                return;
            }
            layer.dataExtent = extent;
            var temp = new olwidget.InfoLayer(data);
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
        })
    }