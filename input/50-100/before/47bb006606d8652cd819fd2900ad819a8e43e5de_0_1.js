function() {
        this._popModal();
        if (this.actor.visible) {
            Tweener.addTween(this.actor,
                             { opacity: 0,
                               time: POPUP_FADE_OUT_TIME,
                               transition: 'easeOutQuad',
                               onComplete: Lang.bind(this,
                                   function() {
                                       this.actor.destroy();
                                   })
                             });
        } else
            this.actor.destroy();
    }