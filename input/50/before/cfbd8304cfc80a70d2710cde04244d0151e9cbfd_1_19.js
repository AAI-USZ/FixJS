function (duration, blinks) {
        if (this._super(duration)) {
            this._times = blinks;
            return true;
        }

        return false;
    }