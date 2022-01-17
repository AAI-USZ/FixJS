function(listener) {
        if ((/AppleWebKit/i).test(navigator.appVersion) && window.onorientationchange) {
            this.off('orientationchange', listener);
        } else {
            $j(window).off('resize', listener);
        }
        return this;
    }