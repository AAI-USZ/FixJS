function (action, rate) {
        cc.Assert(action != null, "");
        this._innerAction = action;
        this._speed = rate;
        return true;
    }