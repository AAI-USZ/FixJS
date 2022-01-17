function() {
        this._notification = this._notificationQueue.shift();
        this._unseenNotifications.push(this._notification);
        if (this._idleMonitorWatchId == 0)
            this._idleMonitorWatchId = this.idleMonitor.add_watch(1000,
                                                                  Lang.bind(this, this._onIdleMonitorWatch));
        this._notificationClickedId = this._notification.connect('done-displaying',
                                                                 Lang.bind(this, this._escapeTray));
        this._notificationBin.child = this._notification.actor;

        this._notificationBin.opacity = 0;
        this._notificationBin.y = 0;
        this._notificationBin.show();

        this._updateShowingNotification();

        let [x, y, mods] = global.get_pointer();
        // We save the position of the mouse at the time when we started showing the notification
        // in order to determine if the notification popped up under it. We make that check if
        // the user starts moving the mouse and _onTrayHoverChanged() gets called. We don't
        // expand the notification if it just happened to pop up under the mouse unless the user
        // explicitly mouses away from it and then mouses back in.
        this._showNotificationMouseX = x;
        this._showNotificationMouseY = y;
        // We save the y coordinate of the mouse at the time when we started showing the notification
        // and then we update it in _notifiationTimeout() if the mouse is moving towards the
        // notification. We don't pop down the notification if the mouse is moving towards it.
        this._lastSeenMouseY = y;
    }