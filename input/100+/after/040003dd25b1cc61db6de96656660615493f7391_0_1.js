function (feature, index, orig) {
            if (feature.getBounds()) {
                if (!bounds.intersects(feature.getBounds())) {
                    feature.setMap(null);
                } else if (!bounds.contains(feature.getBounds().getNorthEast()) ||
                        !bounds.contains(feature.getBounds().getSouthWest())){
                    serverFetchMapType.komooMap.keptFeatures.push(feature);
                }
            } else if (feature.getPosition) {
                if (bounds.contains(feature.getPosition())) {
                    feature.setMap(null);
                }
            }
        }