function () {
        this._other.stop();
        //this._super();
        cc.Action.prototype.stop.call(this);
    }