function(listener) {
        if (window.Touch) this.on('touchstart', listener);
        else this.on('click', listener);
        return this;
    }