function () {
        this._super();

        this._inScene.setScale(0.001);
        this._outScene.setScale(1.0);

        this._inScene.setAnchorPoint(cc.ccp(0.5, 0.5));
        this._outScene.setAnchorPoint(cc.ccp(0.5, 0.5));

        var rotozoom = cc.Sequence.create(
            cc.Spawn.create(cc.ScaleBy.create(this._duration / 2, 0.001),
                cc.RotateBy.create(this._duration / 2, 360 * 2), null),
            cc.DelayTime.create(this._duration / 2), null);

        this._outScene.runAction(rotozoom);
        this._inScene.runAction(
            cc.Sequence.create(rotozoom.reverse(),
                cc.CallFunc.create(this, this.finish), null));
    }