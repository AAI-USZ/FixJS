function () {
        this._super();
        this.centerSprites(1);
        this._grossini.setIsVisible(false);
        var action = cc.Sequence.create(
            cc.Place.create(cc.PointMake(200, 200)),
            cc.Show.create(),
            cc.MoveBy.create(1, cc.PointMake(100, 0)),
            cc.CallFunc.create(this, this.callback1),
            cc.CallFunc.create(this, this.callback2),
            cc.CallFunc.create(this, this.callback3),
            null);
        this._grossini.runAction(action);

    }