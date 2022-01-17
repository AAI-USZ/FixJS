function(listener) {
        if (window.Touch) this.unbind('touchstart', listener);
        else this.unbind('click', listener);
        return this;
    }