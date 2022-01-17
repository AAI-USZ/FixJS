function (target) {
        this._total = 0;
        this._super(target);
        this._innerAction.startWithTarget(target);
    }