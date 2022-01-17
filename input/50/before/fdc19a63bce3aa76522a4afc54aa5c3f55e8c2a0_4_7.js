function (action) {
        cc.Assert(action != null, "Argument must be non-nil");
        cc.ActionManager.sharedManager().addAction(action, this, !this._isRunning);
        return action;
    }