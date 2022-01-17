function (target) {
        this._super(target);
        this._innerAction.startWithTarget(target);
    }