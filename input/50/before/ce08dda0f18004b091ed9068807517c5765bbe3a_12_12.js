function (duration, position) {
        if (this._super(duration)) {
            this._endPosition = position;
            return true;
        }

        return false;
    }