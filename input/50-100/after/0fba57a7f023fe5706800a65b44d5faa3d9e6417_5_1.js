function NoClickDelay(el, options) {
        this.element = $j(el);
        this.options = options || {};
        if( window.Touch ) this.element.off('touchstart').on('touchstart', this.eventListener(this));
    }