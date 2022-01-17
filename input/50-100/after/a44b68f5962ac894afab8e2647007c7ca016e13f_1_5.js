function (x, y, duration, easing, node) {
        var sv = this;

        duration = duration || ScrollView.SNAP_DURATION;
        easing = easing || ScrollView.SNAP_EASING;

        node = node || sv._cb;

        sv.set(SCROLL_X, x, {src: 'ui'});
        sv.set(SCROLL_Y, y, {src: 'ui'});
        sv.scrollTo(x, y, duration, easing, node);
    }