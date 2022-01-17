function () {
        var bounds = komooMap.googleMap.getBounds();
        if (komooMap.options.autoSaveLocation) {
            komooMap.saveLocation();
        }
        komooMap.keptFeatures.forEach(function (feature, index, orig) {
            if (!bounds.intersects(feature.getBounds())) {
                feature.setMap(null);
            }
        });
        komooMap.keptFeatures.clear();
    }