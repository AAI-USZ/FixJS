function(shellwm, actor) {
        actor._windowType = actor.meta_window.get_window_type();
        actor._notifyWindowTypeSignalId = actor.meta_window.connect('notify::window-type', Lang.bind(this, function () {
            let type = actor.meta_window.get_window_type();
            if (type == actor._windowType)
                return;
            if (type == Meta.WindowType.MODAL_DIALOG ||
                actor._windowType == Meta.WindowType.MODAL_DIALOG) {
                let parent = actor.get_meta_window().get_transient_for();
                if (parent)
                    this._checkDimming(parent);
            }

            actor._windowType = type;
        }));
        if (actor.meta_window.is_attached_dialog()) {
            this._checkDimming(actor.get_meta_window().get_transient_for());
            if (this._shouldAnimate()) {
                actor.set_scale(1.0, 0.0);
                actor.show();
                this._mapping.push(actor);

                Tweener.addTween(actor,
                                 { scale_y: 1,
                                   time: WINDOW_ANIMATION_TIME,
                                   transition: "easeOutQuad",
                                   onComplete: this._mapWindowDone,
                                   onCompleteScope: this,
                                   onCompleteParams: [shellwm, actor],
                                   onOverwrite: this._mapWindowOverwrite,
                                   onOverwriteScope: this,
                                   onOverwriteParams: [shellwm, actor]
                                 });
                return;
            }
            shellwm.completed_map(actor);
            return;
        }
        if (!this._shouldAnimate(actor)) {
            shellwm.completed_map(actor);
            return;
        }

        actor.opacity = 0;
        actor.show();

        /* Fade window in */
        this._mapping.push(actor);
        Tweener.addTween(actor,
                         { opacity: 255,
                           time: WINDOW_ANIMATION_TIME,
                           transition: 'easeOutQuad',
                           onComplete: this._mapWindowDone,
                           onCompleteScope: this,
                           onCompleteParams: [shellwm, actor],
                           onOverwrite: this._mapWindowOverwrite,
                           onOverwriteScope: this,
                           onOverwriteParams: [shellwm, actor]
                         });
    }