function() {
        Mainloop.source_remove(this._timeoutId);
        this._timeoutId = 0;
        Tweener.addTween(this._container, { opacity: 0.0,
                                            time: ANIMATION_TIME,
                                            transition: 'easeOutQuad',
                                            onComplete: function() { this.actor.hide(); },
                                            onCompleteScope: this
                                           });
    }