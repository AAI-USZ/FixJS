function (category, index, orig) {
        if (komooMap.overlaysByType[type][category]) {
            komooMap.overlaysByType[type][category].forEach(function (overlay, index, orig) {
                if (!opt_strict || !overlay.getProperties().categories || overlay.getProperties().categories.length == 1) {
                    overlays.push(overlay);
                }
            });
        }
    }