function (target) {
        this._super(target);
        this._delta = cc.ccp(this._delta.x - this._startPosition.x, this._delta.y - this._startPosition.y);
    }