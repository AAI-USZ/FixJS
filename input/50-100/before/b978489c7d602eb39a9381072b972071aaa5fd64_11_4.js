function (enabled) {
        if (enabled != this._isKeypadEnabled) {
            this._isKeypadEnabled = enabled;
            if (this._isRunning) {
                if (enabled) {
                    cc.KeypadDispatcher.sharedDispatcher().addDelegate(this);
                } else {
                    cc.KeypadDispatcher.sharedDispatcher().removeDelegate(this);
                }
            }
        }
    }