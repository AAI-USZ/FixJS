function (duration, deltaAngle) {
        if (this._super(duration)) {
            this._angle = deltaAngle;
            return true;
        }

        return false;
    }