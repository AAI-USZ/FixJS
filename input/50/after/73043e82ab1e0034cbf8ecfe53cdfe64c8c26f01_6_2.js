function (action, speed) {
        cc.Assert(action != null, "");
        this._innerAction = action;
        this._speed = speed;
        return true;
    }