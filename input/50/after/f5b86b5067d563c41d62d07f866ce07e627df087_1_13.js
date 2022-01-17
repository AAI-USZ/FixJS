function (duration, position) {
        if (cc.MoveTo.prototype.initWithDuration.call(this, duration, position)) {
            this._delta = position;
            return true;
        }

        return false;
    }