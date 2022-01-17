function (duration, blinks) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._times = blinks;
            return true;
        }

        return false;
    }