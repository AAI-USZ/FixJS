function (overlay, index, orig) {
            if (overlay.getBounds()) {
                if (!bounds.intersects(overlay.getBounds())) {
                    overlay.setMap(null);
                } else if (!bounds.contains(overlay.getBounds().getNorthEast()) ||
                        !bounds.contains(overlay.getBounds().getSouthWest())){
                    serverFetchMapType.komooMap.keptOverlays.push(overlay);
                }
            } else if (overlay.getPosition) {
                if (bounds.contains(overlay.getPosition())) {
                    overlay.setMap(null);
                }
            }
        }