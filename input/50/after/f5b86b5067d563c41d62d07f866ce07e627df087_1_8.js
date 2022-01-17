function (duration, deltaAngle) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._dstAngle = deltaAngle;
            return true;
        }

        return false;
    }