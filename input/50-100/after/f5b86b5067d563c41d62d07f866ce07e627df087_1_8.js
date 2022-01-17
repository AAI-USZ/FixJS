function (target) {
        cc.JumpBy.prototype.startWithTarget.call(this, target);
        this._delta = new cc.Point(this._delta.x - this._startPosition.x, this._delta.y - this._startPosition.y);
    }