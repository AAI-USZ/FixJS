function (action, times) {
        var d = action.getDuration() * times;

        if (this.initWithDuration(d)) {
            this._times = times;
            this._innerAction = action;
            this._total = 0;
            return true;
        }
        return false;
    }