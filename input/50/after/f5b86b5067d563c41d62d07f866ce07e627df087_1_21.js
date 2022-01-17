function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._fromOpacity = target.getOpacity();
    }