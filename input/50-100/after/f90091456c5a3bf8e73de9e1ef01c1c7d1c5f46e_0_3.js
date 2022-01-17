function (action, times) {
        var duration = action.getDuration() * times;

        if (this.initWithDuration(duration)) {
            this._times = times;
            this._innerAction = action;

            if (action instanceof cc.ActionInstant) {
                this._times -= 1;
            }

            this._total = 0;
            return true;
        }
        return false;
    }