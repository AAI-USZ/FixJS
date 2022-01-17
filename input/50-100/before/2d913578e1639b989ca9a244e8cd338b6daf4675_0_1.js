function() {
        let expandedY = this.actor.height - this._notificationBin.height;

        // Don't animate the notification to its new position if it has shrunk:
        // there will be a very visible "gap" that breaks the illusion.

        if (this._notificationBin.y < expandedY)
            this._notificationBin.y = expandedY;
        else if (this._notification.y != expandedY)
            this._tween(this._notificationBin, '_notificationState', State.SHOWN,
                        { y: expandedY,
                          time: ANIMATION_TIME,
                          transition: 'easeOutQuad'
                        });
   }