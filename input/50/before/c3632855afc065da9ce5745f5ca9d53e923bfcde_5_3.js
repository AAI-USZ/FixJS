function(listener) {
        if (window.Touch) this.bind('touchstart', listener);
        else this.bind('click', listener);
        return this;
    }