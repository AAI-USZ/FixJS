function() {
        Tweener.addTween(this._container, { opacity: 255,
                                            time: ANIMATION_TIME,
                                            transition: 'easeOutQuad'
                                           });
        this.actor.show();
    }