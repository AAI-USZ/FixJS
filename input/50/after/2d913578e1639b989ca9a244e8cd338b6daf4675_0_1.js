function() {
        this._tween(this.actor, '_trayState', State.HIDDEN,
                    { y: 0,
                      time: ANIMATION_TIME,
                      transition: 'easeOutQuad'
                    });
    }