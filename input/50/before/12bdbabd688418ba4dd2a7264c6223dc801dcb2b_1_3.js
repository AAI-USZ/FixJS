function (action) {
        cc.Assert(action != null, "Argument must be non-nil");
        this._actionManager.addAction(action, this, !this._isRunning);
        return action;
    }