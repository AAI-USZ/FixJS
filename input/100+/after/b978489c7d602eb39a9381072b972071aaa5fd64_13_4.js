function () {
        this._super();

        this._inScene.setScale(0.001);
        this._outScene.setScale(1.0);

        this._inScene.setAnchorPoint(cc.ccp(2 / 3.0, 0.5));
        this._outScene.setAnchorPoint(cc.ccp(1 / 3.0, 0.5));

        var scaleOut = cc.ScaleTo.create(this._duration, 0.01);
        var scaleIn = cc.ScaleTo.create(this._duration, 1.0);

        this._inScene.runAction(this.easeActionWithAction(scaleIn));
        this._outScene.runAction(
            cc.Sequence.create(
                this.easeActionWithAction(scaleOut),
                cc.CallFunc.create(this, this.finish)
            )
        );
    }