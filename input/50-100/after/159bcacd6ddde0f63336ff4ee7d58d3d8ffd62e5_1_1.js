function(e) {
        var sv = this,
            gesture = sv._gesture,
            duration = e.duration,
            easing = e.easing,
            val = e.newVal;

        if(e.src !== UI) {
            if (e.attrName === SCROLL_X) {
                sv.scrollTo(val, sv.get(SCROLL_Y), duration, easing);
            }
            else {
                sv.scrollTo(sv.get(SCROLL_X), val, duration, easing);
            }
        }
    }