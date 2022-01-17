function () {
        var now = new cc.timeval();
        now = cc.Time.gettimeofdayCocos2d();
        if (!now) {
            cc.log("error in gettimeofday");
            this._deltaTime = 0;
            return;
        }

        // new delta time.
        if (this._nextDeltaTimeZero) {
            this._deltaTime = 0;
            this._nextDeltaTimeZero = false;
        } else {
            this._deltaTime = (now.tv_sec - this._lastUpdate.tv_sec) + (now.tv_usec - this._lastUpdate.tv_usec) / 1000000.0;
            this._deltaTime = Math.max(0, this._deltaTime);
        }

        if (cc.DEBUG) {
            if (this._deltaTime > 0.2) {
                this._deltaTime = 1 / 60.0;
            }
        }
        this._lastUpdate = now;
    }