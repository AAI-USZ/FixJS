function (duration, position) {
        if (this._super(duration, position)) {
            this._delta = position;
            return true;
        }

        return false;
    }