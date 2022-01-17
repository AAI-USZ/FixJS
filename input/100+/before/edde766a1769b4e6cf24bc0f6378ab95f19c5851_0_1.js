function() {
        let tracker = Shell.WindowTracker.get_default();
        let focusedApp = tracker.focus_app;
        let lastStartedApp = null;
        let workspace = global.screen.get_active_workspace();
        for (let i = 0; i < this._startingApps.length; i++)
            if (this._startingApps[i].is_on_workspace(workspace))
                lastStartedApp = this._startingApps[i];

        let targetApp = focusedApp != null ? focusedApp : lastStartedApp;

        if (targetApp == null) {
            if (!this._targetIsCurrent)
                return;

            this.actor.reactive = false;
            this._targetIsCurrent = false;

            Tweener.removeTweens(this.actor);
            Tweener.addTween(this.actor, { opacity: 0,
                                           time: Overview.ANIMATION_TIME,
                                           transition: 'easeOutQuad' });
            return;
        }

        if (!targetApp.is_on_workspace(workspace))
            return;

        if (!this._targetIsCurrent) {
            this.actor.reactive = true;
            this._targetIsCurrent = true;

            Tweener.removeTweens(this.actor);
            Tweener.addTween(this.actor, { opacity: 255,
                                           time: Overview.ANIMATION_TIME,
                                           transition: 'easeOutQuad' });
        }

        /* Added */
		let win = global.display.focus_window;

		if (!win._notifyTitleId) {
			this._initWindow(win);
		}

		this._changeTitle(win, targetApp)
        /* End added */

        if (targetApp == this._targetApp) {
            if (targetApp && targetApp.get_state() != Shell.AppState.STARTING) {
                this.stopAnimation();
                this._maybeSetMenu();
            }
            return;
        }

        this._spinner.actor.hide();
        if (this._iconBox.child != null)
            this._iconBox.child.destroy();
        this._iconBox.hide();
        //this._label.setText('');

        this.disconnectTrackedSignals(this._targetAppSignals);
        if (targetApp) {
            this.connectAndTrack(this._targetAppSignals, targetApp,
                'notify::menu', Lang.bind(this, this._sync));
            this.connectAndTrack(this._targetAppSignals, targetApp,
                'notify::action-group', Lang.bind(this, this._sync));
        }

        this._targetApp = targetApp;
        let icon = targetApp.get_faded_icon(2 * PANEL_ICON_SIZE);

        //this._label.setText(targetApp.get_name());
        this.setName(targetApp.get_name());

        this._iconBox.set_child(icon);
        this._iconBox.show();

        if (targetApp.get_state() == Shell.AppState.STARTING)
            this.startAnimation();
        else
            this._maybeSetMenu();

        this.emit('changed');
    }