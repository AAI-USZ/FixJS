function (target) {
        this._super(target);
        this._config.controlPoint_1 = cc.ccpSub(this._config.controlPoint_1, this._startPosition);
        this._config.controlPoint_2 = cc.ccpSub(this._config.controlPoint_2, this._startPosition);
        this._config.endPosition = cc.ccpSub(this._config.endPosition, this._startPosition);
    }