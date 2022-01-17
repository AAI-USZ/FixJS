function () {
        this._one.stop();
        this._two.stop();
        cc.Action.prototype.stop.call(this);
    }