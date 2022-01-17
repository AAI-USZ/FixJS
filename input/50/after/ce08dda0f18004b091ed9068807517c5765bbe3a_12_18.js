function (t, c) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,t)) {
            this._config = c;
            return true;
        }

        return false;
    }