function (target) {
        this._super(target);
        this._startPosition = target.getPosition();
        this._delta = cc.ccpSub(this._endPosition, this._startPosition);
    }