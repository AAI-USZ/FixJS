function() {
        if (fullscreened) { return; } else { fullscreened = true; }
        smallSize = [map.parent.offsetWidth, map.parent.offsetHeight];
        map.parent.className += ' wax-fullscreen-map';
        body.className += ' wax-fullscreen-view';
        ss(map.parent.offsetWidth, map.parent.offsetHeight);
    }