function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._startAngle = target.getRotation();
    }