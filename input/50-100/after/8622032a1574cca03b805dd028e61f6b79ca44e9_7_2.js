function() {
        if (!fullscreened) { return; } else { fullscreened = false; }
        map.parent.className = map.parent.className.replace(' map-fullscreen-map', '');
        body.className = body.className.replace(' map-fullscreen-view', '');
        ss(smallSize[0], smallSize[1]);
    }