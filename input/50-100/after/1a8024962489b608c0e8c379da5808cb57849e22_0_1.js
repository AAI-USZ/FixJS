function getOnScreenFeatures(layer_features) {
                for(i=0;i< layer_features.length;i++) {
                    var feature = layer_features[i];
                    if (feature.getVisibility() === true && 
                        feature.onScreen() === true) {
                        onscreen_features.push(feature)
                        }
                    
                    }
                }