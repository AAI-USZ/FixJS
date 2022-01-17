function () {
        var r = new cc.BezierConfig();

        r.endPosition = cc.ccpNeg(this._config.endPosition);
        r.controlPoint_1 = cc.ccpAdd(this._config.controlPoint_2, cc.ccpNeg(this._config.endPosition));
        r.controlPoint_2 = cc.ccpAdd(this._config.controlPoint_1, cc.ccpNeg(this._config.endPosition));

        return cc.BezierBy.create(this._duration, r);
    }