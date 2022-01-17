function (target) {
        cc.ActionInterval.prototype.startWithTarget.call(this,target);
        this._startPosition = target.getPosition();
        this._delta = cc.ccpSub(this._endPosition, this._startPosition);
    }