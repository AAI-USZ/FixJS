function (duration, deltaAngle) {
        if (this._super(duration)) {
            this._dstAngle = deltaAngle;
            return true;
        }

        return false;
    }