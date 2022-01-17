function(e) {
        var sv = this,
            duration = e.duration,
            easing = e.easing,
            val = e.newVal,
            currentX = sv.get(SCROLL_X), // Shouldn't grab these all the time?
            currentY = sv.get(SCROLL_Y);

        if(e.src !== UI) {
            if (e.attrName == SCROLL_X) {
                this._uiScrollTo(val, currentY, duration, easing);
            } else {
                this._uiScrollTo(currentX, val, duration, easing);
            }
        }
    }