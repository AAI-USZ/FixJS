function (duration, red, green, blue) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._to = cc.ccc3(red, green, blue);
            return true;
        }

        return false;
    }