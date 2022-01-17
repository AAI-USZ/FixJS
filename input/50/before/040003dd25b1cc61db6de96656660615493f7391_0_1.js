function (overlay, index, orig) {
                    if (!me.loadedOverlays[overlay.wikimapia_id]) {
                        overlay.setMap(me.komooMap.googleMap);
                        me.loadedOverlays[overlay.wikimapia_id] = overlay;
                    }
                }