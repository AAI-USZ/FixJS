function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        //this._super(target);
        this._split = this._actions[0].getDuration() / this._duration;
        this._last = -1;
    }