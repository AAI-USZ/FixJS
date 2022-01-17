function() {
        this._tween(this.actor, '_trayState', State.HIDDEN,
                    { y: this.actor.height,
                      time: ANIMATION_TIME,
                      transition: 'easeOutQuad'
                    });
    }