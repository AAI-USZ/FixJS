function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._one.startWithTarget(target);
        this._two.startWithTarget(target);
    }