function (duration, opacity) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._toOpacity = opacity;
            return true;
        }

        return false;
    }