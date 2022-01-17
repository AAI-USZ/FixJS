function () {
        this._innerAction.stop();
        cc.Action.prototype.stop.call(this);
    }