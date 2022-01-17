function(listener) {
        if ((/AppleWebKit/i).test(navigator.appVersion) && "orientation" in window && "onorientationchange" in window) {
            this.on('orientationchange', listener);
        } else {
            $j(window).resize(listener);
        }
        return this;
    }