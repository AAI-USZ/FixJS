function () {
        // Issue #1305
        if (this._last != -1) {
            this._actions[this._last].stop();
        }
        this._super();
    }