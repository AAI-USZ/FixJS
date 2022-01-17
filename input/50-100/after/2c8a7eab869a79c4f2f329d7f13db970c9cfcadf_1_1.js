function (x, y, duration, easing, node) {
        var sv = this,
            node = node || sv._cb,
            duration = duration || ScrollView.SNAP_DURATION,
            easing = easing || ScrollView.SNAP_EASING;

        sv.set(SCROLL_X, x, {src: 'ui'});
        sv.set(SCROLL_Y, y, {src: 'ui'});
        sv.scrollTo(x, y, duration, easing, node);
    }