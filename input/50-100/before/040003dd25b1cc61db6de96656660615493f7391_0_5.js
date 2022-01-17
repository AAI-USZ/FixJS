function () {
        var bounds = komooMap.googleMap.getBounds();
        if (komooMap.options.autoSaveLocation) {
            komooMap.saveLocation();
        }
        komooMap.keptOverlays.forEach(function (overlay, index, orig) {
            if (!bounds.intersects(overlay.getBounds())) {
                overlay.setMap(null);
            }
        });
        komooMap.keptOverlays.clear();
    }