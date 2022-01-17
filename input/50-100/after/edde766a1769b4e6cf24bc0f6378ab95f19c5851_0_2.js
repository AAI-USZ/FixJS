function () {
        // disconnect signals
        disconnectTrackedSignals(this);

        // any signals from _changeWorkspaces
        disconnectTrackedSignals(this._wsSignals);

        // any signals from _initWindow. _sync requires the _notifyTitleId.
        let windows = global.get_window_actors();
        for (let i = 0; i < windows.length; ++i) {
            let win = windows[i];
            if (win._notifyTitleId) {
                win.disconnect(win._notifyTitleId);
                delete win._notifyTitleId;
            }
        }

        // any signals from _sync
        disconnectTrackedSignals(this._targetAppSignals);

        // Call parent destroy.
        this.parent();
    }