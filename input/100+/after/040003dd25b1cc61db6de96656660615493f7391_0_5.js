function (data, textStatus, jqXHR) {
                var features = createFeatures(data);
                me.komooMap.fetchedTiles[addr] = {
                    json: data,
                    features: features
                };
                features.forEach(function (feature, index, orig) {
                    if (!me.loadedFeatures[feature.wikimapia_id]) {
                        feature.setMap(me.komooMap);
                        me.loadedFeatures[feature.wikimapia_id] = feature;
                    }
                });
                //if (me.komooMap.options.debug) {
                    // Display debug info.
                    div.innerHTML = JSON.stringify(data);
                    $(div).css("border", "solid 1px #F00");
                //}
            }