function (enabled) {
        if (enabled != this._isKeypadEnabled) {
            this._isKeypadEnabled = enabled;
            if (this._isRunning) {
                var director = cc.Director.sharedDirector();
                if (enabled) {
                    director.getKeypadDispatcher().addDelegate(this);
                } else {
                    director.getKeypadDispatcher().removeDelegate(this);
                }
            }
        }
    }