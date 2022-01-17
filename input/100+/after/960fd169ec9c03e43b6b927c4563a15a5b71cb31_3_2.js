function () {
        this._super();

        var winSize = cc.Director.sharedDirector().getWinSize();

        var to1 = cc.ProgressTo.create(2, 100);
        var to2 = cc.ProgressTo.create(2, 100);

        var left = cc.ProgressTimer.create(cc.Sprite.create(s_pathSister1));
        left.setType(cc.CCPROGRESS_TIMER_TYPE_BAR);
        //    Setup for a bar starting from the left since the midpoint is 0 for the x
        left.setMidpoint(new cc.Point(0, 0));
        //    Setup for a horizontal bar since the bar change rate is 0 for y meaning no vertical change
        left.setBarChangeRate(new cc.Point(1, 0));
        this.addChild(left);
        left.setPosition(cc.PointMake(200, winSize.height / 2));
        left.runAction(cc.RepeatForever.create(to1));

        var right = cc.ProgressTimer.create(cc.Sprite.create(s_pathSister2));
        right.setType(cc.CCPROGRESS_TIMER_TYPE_BAR);
        //    Setup for a bar starting from the left since the midpoint is 1 for the x
        right.setMidpoint(new cc.Point(1, 0));
        //    Setup for a horizontal bar since the bar change rate is 0 for y meaning no vertical change
        right.setBarChangeRate(new cc.Point(1, 0));
        this.addChild(right);
        right.setPosition(cc.PointMake(winSize.width - 200, winSize.height / 2));
        right.runAction(cc.RepeatForever.create(to2));
    }