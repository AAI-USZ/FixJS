function (target) {
        //this._super(target);
        cc.Action.prototype.startWithTarget.call(this,target);
        this._innerAction.startWithTarget(target);
    }