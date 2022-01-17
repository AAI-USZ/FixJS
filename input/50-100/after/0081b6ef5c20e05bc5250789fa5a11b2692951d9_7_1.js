function () {
        this._super();
        this.centerSprites(1);

        var action = cc.Sequence.create(cc.MoveBy.create(2.0, cc.ccp(200, 0)),
            cc.CallFunc.create(this._grossini, this.removeFromParentAndCleanup, true));

        this._grossini.runAction(action);
    }