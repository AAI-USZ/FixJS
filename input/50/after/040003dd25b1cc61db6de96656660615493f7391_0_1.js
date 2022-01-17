function (feature, index, orig) {
                    if (!me.loadedFeatures[feature.wikimapia_id]) {
                        feature.setMap(me.komooMap);
                        me.loadedFeatures[feature.wikimapia_id] = feature;
                    }
                }