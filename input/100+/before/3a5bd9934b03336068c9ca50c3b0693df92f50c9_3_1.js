function () {
        this._super();
        var winSize = cc.Director.sharedDirector().getWinSize();

        var to1 = cc.ProgressTo.create(2, 100);
        var to2 = cc.ProgressTo.create(2, 100);

        var left = cc.ProgressTimer.create(s_pathSister1);
        left.setType(cc.CCPROGRESS_TIMER_TYPE_RADIAL_CW);
        this.addChild(left);
        left.setPosition(cc.PointMake(100, winSize.height / 2));
        left.runAction(cc.RepeatForever.create(to1));

        var right = cc.ProgressTimer.create(s_pathBlock);
        right.setType(cc.CCPROGRESS_TIMER_RADIAL_CCW);
        this.addChild(right);
        right.setPosition(cc.PointMake(winSize.width - 100, winSize.height / 2));
        right.runAction(cc.RepeatForever.create(to2));
    }