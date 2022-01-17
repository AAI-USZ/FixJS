function (duration, deltaAngle) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._angle = deltaAngle;
            return true;
        }

        return false;
    }