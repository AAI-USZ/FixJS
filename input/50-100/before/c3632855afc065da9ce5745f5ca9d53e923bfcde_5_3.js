function(listener) {
        if ((/AppleWebKit/i).test(navigator.appVersion) && window.onorientationchange) {
            this.unbind('orientationchange', listener);
        } else {
            $j(window).unbind('resize', listener);
        }
        return this;
    }