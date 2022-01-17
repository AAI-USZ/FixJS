function featureFilter(event) {
            console.log('event occured'+ event.type);
            var current_extent = map.getExtent();
            console.log(current_extent);
            var onscreen_features = [];
            
            var layer = map.getLayersByName('Others Layer')[0];
            var layer_features = layer.features;
            getOnScreenFeatures(layer_features);
            
            layer = map.getLayersByName('Route Layer')[0];
            layer_features = layer.features;
            getOnScreenFeatures(layer_features);
            
            layer = map.getLayersByName('Area Layer')[0];
            layer_features = layer.features;
            getOnScreenFeatures(layer_features);
            
            layer = map.getLayersByName('Point Layer')[0];
            layer_features = layer.features;
            getOnScreenFeatures(layer_features);
            
            
            function getOnScreenFeatures(layer_features) {
                for(i=0;i< layer_features.length;i++) {
                    var feature = layer_features[i];
                    if (feature.onScreen() === true) {
                        onscreen_features.push(feature)
                        }
                    
                    }
                }
            
            console.log(onscreen_features);
            
            }