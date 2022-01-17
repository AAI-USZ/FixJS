function (target) {
        this._total = 0;
        this._nextDt = this._innerAction.getDuration() / this._duration;
        //this._super(target);
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._innerAction.startWithTarget(target);
    }