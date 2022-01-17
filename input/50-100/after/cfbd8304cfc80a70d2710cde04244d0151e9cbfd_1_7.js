function (duration, position, height, jumps) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this,duration)) {
            this._delta = position;
            this._height = height;
            this._jumps = jumps;

            return true;
        }

        return false;
    }