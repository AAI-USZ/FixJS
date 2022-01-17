function (action) {
        cc.Assert(action != null, "");
        cc.Assert(action != this._other, "");

        if (this._super(action.getDuration())) {
            // Don't leak if action is reused

            this._other = action;

            return true;
        }

        return false;
    }