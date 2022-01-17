function () {
        this._super();
        var winSize = cc.Director.sharedDirector().getWinSize();

        var to1 = cc.ProgressTo.create(2, 100);
        var to2 = cc.ProgressTo.create(2, 100);

        var left = cc.ProgressTimer.create(cc.Sprite.create(s_pathSister1));
        left.setType(cc.CCPROGRESS_TIMER_TYPE_RADIAL);
        this.addChild(left);
        left.setPosition(cc.PointMake(200, winSize.height / 2));
        left.runAction(cc.RepeatForever.create(to1));

        var right = cc.ProgressTimer.create(cc.Sprite.create(s_pathBlock));
        right.setType(cc.CCPROGRESS_TIMER_TYPE_RADIAL);
        right.setReverseProgress(true);
        this.addChild(right);
        right.setPosition(cc.PointMake(winSize.width - 200, winSize.height / 2));
        right.runAction(cc.RepeatForever.create(to2));
    }