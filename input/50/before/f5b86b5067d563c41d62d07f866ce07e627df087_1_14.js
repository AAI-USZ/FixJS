function (target) {
        var temp = this._delta;
        this._super(target);
        this._delta = temp;
    }