function (action) {
        cc.Assert(action != null, "Argument must be non-nil");
        this.getActionManager().addAction(action, this, !this._isRunning);
        return action;
    }