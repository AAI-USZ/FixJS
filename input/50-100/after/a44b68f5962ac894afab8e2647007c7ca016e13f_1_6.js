function(e) {
        var sv = this,
            gesture = sv._gesture,
            duration = e.duration,
            easing = e.easing,
            val = e.newVal;

        if(e.src !== UI) {
            if (e.attrName === SCROLL_X) {
                sv.scrollTo(val, gesture.startY, duration, easing);
            }
            else {
                sv.scrollTo(gesture.startX, val, duration, easing);
            }
        }
    }