function (target) {
        //this._super(target);
        cc.Action.prototype.startWithTarget.call(this,target)
        this._elapsed = 0;
        this._firstTick = true;
    }