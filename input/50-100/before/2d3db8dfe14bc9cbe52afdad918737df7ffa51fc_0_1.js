function (dirResult, dirStatus) {
            if (dirStatus != google.maps.DirectionsStatus.OK) {
                alert('Directions failed: ' + dirStatus);
                return;
            }
            // Show directions
            WPmap.dirRenderer.setMap(WPmap.map);
            WPmap.dirRenderer.setPanel(WPmap.dirContainer);
            WPmap.dirRenderer.setDirections(dirResult);
        }