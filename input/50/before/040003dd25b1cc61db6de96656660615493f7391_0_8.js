function (overlay, index, orig) {
            if (!bounds.intersects(overlay.getBounds())) {
                overlay.setMap(null);
            }
        }