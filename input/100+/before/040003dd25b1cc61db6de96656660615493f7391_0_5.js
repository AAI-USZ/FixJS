function (data, textStatus, jqXHR) {
                var overlays = createOverlays(data);
                me.komooMap.fetchedTiles[addr] = {
                    json: data,
                    overlays: overlays
                };
                overlays.forEach(function (overlay, index, orig) {
                    if (!me.loadedOverlays[overlay.wikimapia_id]) {
                        overlay.setMap(me.komooMap.googleMap);
                        me.loadedOverlays[overlay.wikimapia_id] = overlay;
                    }
                });
                //if (me.komooMap.options.debug) {
                    // Display debug info.
                    div.innerHTML = JSON.stringify(data);
                    $(div).css("border", "solid 1px #F00");
                //}
            }