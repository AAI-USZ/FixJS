function (enabled) {
        if (this._isTouchEnabled != enabled) {
            this._isTouchEnabled = enabled;


            if (this._isRunning) {
                if (enabled) {
                    this.registerWithTouchDispatcher();
                } else {
                    // have problems?
                    cc.TouchDispatcher.sharedDispatcher().removeDelegate(this);
                }
            }
        }
    }