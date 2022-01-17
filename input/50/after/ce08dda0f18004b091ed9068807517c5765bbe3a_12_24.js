function (target) {
        //this._super(target);
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._from = this._target.getColor();
    }