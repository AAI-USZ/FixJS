function(x, y, duration, easing) {
        // TODO: This doesn't seem right. This is not UI logic.
        duration = duration || 0;
        easing = easing || null;
        this.scrollTo(x, y, duration, easing);
    }