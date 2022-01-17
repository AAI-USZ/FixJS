function () {
        this._super();

        var s = cc.Director.sharedDirector().getWinSize();

        this._inScene.setScale(0.5);
        this._inScene.setPosition(cc.ccp(s.width, 0));
        this._inScene.setAnchorPoint(cc.ccp(0.5, 0.5));
        this._outScene.setAnchorPoint(cc.ccp(0.5, 0.5));

        //TODO
        var jump = cc.JumpBy.create(this._duration / 4, cc.ccp(-s.width, 0), s.width / 4, 2);
        var scaleIn = cc.ScaleTo.create(this._duration / 4, 1.0);
        var scaleOut = cc.ScaleTo.create(this._duration / 4, 0.5);

        var jumpZoomOut = cc.Sequence.create(scaleOut, jump);
        var jumpZoomIn = cc.Sequence.create(jump, scaleIn);

        var delay = cc.DelayTime.create(this._duration / 2);
        this._outScene.runAction(jumpZoomOut);
        this._inScene.runAction(cc.Sequence.create(delay, jumpZoomIn,
            cc.CallFunc.create(this, this.finish)));
    }