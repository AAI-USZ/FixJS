function() {
        if (!this._open)
            return;

        this._objInspector.actor.hide();

        this._open = false;
        Tweener.removeTweens(this.actor);

        this.setBorderPaintTarget(null);

        Main.popModal(this._entry);

        Tweener.addTween(this.actor, { time: 0.5 / St.get_slow_down_factor(),
                                       transition: 'easeOutQuad',
                                       y: this._hiddenY,
                                       onComplete: Lang.bind(this, function () {
                                           this.actor.hide();
                                       })
                                     });
    }