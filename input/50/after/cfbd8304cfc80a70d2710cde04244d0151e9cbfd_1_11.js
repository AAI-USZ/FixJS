function (duration, position) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._endPosition = position;
            return true;
        }

        return false;
    }