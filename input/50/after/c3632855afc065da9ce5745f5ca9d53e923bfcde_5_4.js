function(listener) {
        if (window.Touch) this.off('touchstart', listener);
        else this.off('click', listener);
        return this;
    }