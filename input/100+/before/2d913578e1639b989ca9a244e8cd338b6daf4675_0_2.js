function() {
        if (this.actor.hover) {
            // Don't do anything if the one pixel area at the bottom is hovered over while the tray is hidden.
            if (this._trayState == State.HIDDEN)
                return;

            // Don't do anything if this._useLongerTrayLeftTimeout is true, meaning the notification originally
            // popped up under the pointer, but this._trayLeftTimeoutId is 0, meaning the pointer didn't leave
            // the tray yet. We need to check for this case because sometimes _onTrayHoverChanged() gets called
            // multiple times while this.actor.hover is true.
            if (this._useLongerTrayLeftTimeout && !this._trayLeftTimeoutId)
                return;

            this._useLongerTrayLeftTimeout = false;
            if (this._trayLeftTimeoutId) {
                Mainloop.source_remove(this._trayLeftTimeoutId);
                this._trayLeftTimeoutId = 0;
                this._trayLeftMouseX = -1;
                this._trayLeftMouseY = -1;
                return;
            }

            if (this._showNotificationMouseX >= 0) {
                let actorAtShowNotificationPosition =
                    global.stage.get_actor_at_pos(Clutter.PickMode.ALL, this._showNotificationMouseX, this._showNotificationMouseY);
                this._showNotificationMouseX = -1;
                this._showNotificationMouseY = -1;
                // Don't set this._pointerInTray to true if the pointer was initially in the area where the notification
                // popped up. That way we will not be expanding notifications that happen to pop up over the pointer
                // automatically. Instead, the user is able to expand the notification by mousing away from it and then
                // mousing back in. Because this is an expected action, we set the boolean flag that indicates that a longer
                // timeout should be used before popping down the notification.
                if (this.actor.contains(actorAtShowNotificationPosition)) {
                    this._useLongerTrayLeftTimeout = true;
                    return;
                }
            }
            this._pointerInTray = true;
            this._updateState();
        } else {
            // We record the position of the mouse the moment it leaves the tray. These coordinates are used in
            // this._onTrayLeftTimeout() to determine if the mouse has moved far enough during the initial timeout for us
            // to consider that the user intended to leave the tray and therefore hide the tray. If the mouse is still
            // close to its previous position, we extend the timeout once.
            let [x, y, mods] = global.get_pointer();
            this._trayLeftMouseX = x;
            this._trayLeftMouseY = y;

            // We wait just a little before hiding the message tray in case the user quickly moves the mouse back into it.
            // We wait for a longer period if the notification popped up where the mouse pointer was already positioned.
            // That gives the user more time to mouse away from the notification and mouse back in in order to expand it.
            let timeout = this._useLongerHideTimeout ? LONGER_HIDE_TIMEOUT * 1000 : HIDE_TIMEOUT * 1000;
            this._trayLeftTimeoutId = Mainloop.timeout_add(timeout, Lang.bind(this, this._onTrayLeftTimeout));
        }
    }