function() {
        if (!fullscreened) { return; } else { fullscreened = false; }
        map.parent.className = map.parent.className.replace(' wax-fullscreen-map', '');
        body.className = body.className.replace(' wax-fullscreen-view', '');
        ss(smallSize[0], smallSize[1]);
    }