function (item, index, orig) {
                var overlay = komooMap.overlays.pop(); // The newly created overlay should be the last at array.
                overlay.setMap(null);
            }