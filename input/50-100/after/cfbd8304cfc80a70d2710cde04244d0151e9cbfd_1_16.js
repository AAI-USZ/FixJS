f        cc.Assert(action != null, "");
        cc.Assert(action != this._other, "");

        //if (this._super(action.getDuration())) {
        if (cc.ActionInterval.prototype.initWithDuration.call(this, action.getDuration())) {
            // Don't leak if action is reused
            this._other = action;
            return true;
        }

        return false;
    },
