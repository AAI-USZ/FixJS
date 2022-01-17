function (feature, index, orig) {
            if (!bounds.intersects(feature.getBounds())) {
                feature.setMap(null);
            }
        }