function (target) {
        //this._super(this._forcedTarget);
        cc.ActionInterval.prototype.startWithTarget.call(this,this._forcedTarget);
        this._action.startWithTarget(this._forcedTarget);
    }