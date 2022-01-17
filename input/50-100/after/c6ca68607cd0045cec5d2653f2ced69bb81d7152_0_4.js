function() {
        if (fullscreened) { return; } else { fullscreened = true; }
        smallSize = [map.parent.offsetWidth, map.parent.offsetHeight];
        map.parent.className += ' map-fullscreen-map';
        body.className += ' map-fullscreen-view';
        ss(map.parent.offsetWidth, map.parent.offsetHeight);
    }