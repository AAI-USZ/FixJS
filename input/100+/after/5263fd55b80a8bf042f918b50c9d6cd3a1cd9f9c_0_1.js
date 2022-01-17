function (data, textStatus, jqXHR) {
                var overlays = me.komooMap.loadGeoJSON(JSON.parse(data), false);
                me.komooMap.fetchedTiles[addr] = {
                    geojson: data,
                    overlays: overlays
                };
                if (me.komooMap.options.debug) {
                    // Display debug info.
                    div.innerHTML = data;
                    $(div).css("border", "solid 1px #F00");
                }
                overlays.forEach(function (overlay, index, orig) {
                    overlay.setMap(me.komooMap.googleMap);
                    if (overlay.setIcon) {
                        overlay.setIcon(overlay.getIconUrl(me.komooMap.googleMap.getZoom()));
                    }
                    if (overlay.getMarker()) {
                        // Display polygons as a point depending the zoom level
                        if (zoom < me.komooMap.options.clustererMaxZoom) {
                            //overlay.setMap(null);
                        } else {
                            overlay.setMap(me.komooMap.googleMap);
                        }
                    }
                    if (overlay.getPaths) {
                        /*
                        // Brings small polygons to front
                        var zIndex = overlay.zIndex;
                        overlays.forEach(function (overlayToTest, index, orig) {
                            var bounds = overlayToTest.bounds;
                            if (overlay == overlayToTest || !bounds){
                                return;
                            }
                            if (bounds.contains(overlay.bounds.getNorthEast()) || bounds.contains(overlay.bounds.getSouthWest())) {
                                var zIndexToTest = overlayToTest.zIndex;
                                if (zIndexToTest >= zIndex) {
                                    zIndex = zIndexToTest + 1;
                                    overlay.zIndex = zIndex;
                                }
                            };
                        });
                        */
                    }
                });
            }