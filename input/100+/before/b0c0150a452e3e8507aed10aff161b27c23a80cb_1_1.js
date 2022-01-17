function(eventTime) {
        this.emit('drag-cancelled', eventTime);
        this._dragInProgress = false;
        let [snapBackX, snapBackY, snapBackScale] = this._getRestoreLocation();

        if (this._actorDestroyed) {
            global.unset_cursor();
            if (!this._buttonDown)
                this._dragComplete();
            this.emit('drag-end', eventTime, false);
            if (!this._dragOrigParent)
                this._dragActor.destroy();

            return;
        }

        this._animationInProgress = true;
        // No target, so snap back
        Tweener.addTween(this._dragActor,
                         { x: snapBackX,
                           y: snapBackY,
                           scale_x: snapBackScale,
                           scale_y: snapBackScale,
                           opacity: this._dragOrigOpacity,
                           time: SNAP_BACK_ANIMATION_TIME,
                           transition: 'easeOutQuad',
                           onComplete: this._onAnimationComplete,
                           onCompleteScope: this,
                           onCompleteParams: [this._dragActor, eventTime]
                         });
    }