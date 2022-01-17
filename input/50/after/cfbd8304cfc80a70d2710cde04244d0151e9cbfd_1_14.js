function (target) {
        var temp = this._delta;
        cc.MoveTo.prototype.startWithTarget.call(this,target);
        this._delta = temp;
    }