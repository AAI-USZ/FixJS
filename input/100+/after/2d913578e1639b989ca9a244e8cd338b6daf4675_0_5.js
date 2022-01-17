function() {
        Tweener.removeTweens(this._notificationBin);

        // We auto-expand notifications with CRITICAL urgency.
        // We use Tweener.removeTweens() to remove a tween that was hiding the notification we are
        // updating, in case that notification was in the process of being hidden. However,
        // Tweener.removeTweens() would also remove a tween that was updating the position of the
        // notification we are updating, in case that notification was already expanded and its height
        // changed. Therefore we need to call this._expandNotification() for expanded notifications
        // to make sure their position is updated.
        if (this._notification.urgency == Urgency.CRITICAL || this._notification.expanded)
            this._expandNotification(true);

        // We tween all notifications to full opacity. This ensures that both new notifications and
        // notifications that might have been in the process of hiding get full opacity.
        //
        // We tween any notification showing in the banner mode to banner height
        // (this._notificationBin.y = -this.actor.height).
        // This ensures that both new notifications and notifications in the banner mode that might
        // have been in the process of hiding are shown with the banner height.
        //
        // We use this._showNotificationCompleted() onComplete callback to extend the time the updated
        // notification is being shown.
        //
        // We don't set the y parameter for the tween for expanded notifications because
        // this._expandNotification() will result in getting this._notificationBin.y set to the appropriate
        // fully expanded value.
        let tweenParams = { opacity: 255,
                            time: ANIMATION_TIME,
                            transition: 'easeOutQuad',
                            onComplete: this._showNotificationCompleted,
                            onCompleteScope: this
                          };
        if (!this._notification.expanded)
            tweenParams.y = - this.actor.height;

        this._tween(this._notificationBin, '_notificationState', State.SHOWN, tweenParams);
   }