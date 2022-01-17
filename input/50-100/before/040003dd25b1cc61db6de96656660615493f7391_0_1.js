function (overlay, index, orig) {
            overlay.setMap(me.komooMap.googleMap);
            if (overlay.setIcon) {
                overlay.setIcon(overlay.getIconUrl(me.komooMap.googleMap.getZoom()));
            }
            if (overlay.getMarker()) {
                if (zoom < me.komooMap.options.clustererMaxZoom) {
                    //overlay.setMap(null);
                } else {
                    overlay.setMap(me.komooMap.googleMap);
                }
            }
        }