function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._startPosition = target.getPosition();
    }