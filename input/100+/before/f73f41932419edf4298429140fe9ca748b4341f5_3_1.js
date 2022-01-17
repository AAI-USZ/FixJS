function () {
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();
        var to = cc.ProgressTo.create(6, 100);

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_grossiniPlist);

        var left = cc.ProgressTimer.create(cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("grossini_dance_01.png"));
        left.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        //    Setup for a bar starting from the bottom since the midpoint is 0 for the y
        left.setMidpoint(cc.p(0.5, 0.5));
        //    Setup for a vertical bar since the bar change rate is 0 for x meaning no horizontal change
        left.setBarChangeRate(cc.p(1, 0));
        this.addChild(left);
        left.setPosition(cc.p(150, winSize.height / 2));
        left.runAction(cc.RepeatForever.create(to.copy()));

        var middle = cc.ProgressTimer.create(cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("grossini_dance_02.png"));
        middle.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        //    Setup for a bar starting from the bottom since the midpoint is 0 for the y
        middle.setMidpoint(cc.p(0.5, 0.5));
        //    Setup for a vertical bar since the bar change rate is 0 for x meaning no horizontal change
        middle.setBarChangeRate(cc.p(1, 1));
        this.addChild(middle);
        middle.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        middle.runAction(cc.RepeatForever.create(to.copy()));

        var right = cc.ProgressTimer.create(cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("grossini_dance_03.png"));
        right.setType(cc.PROGRESS_TIMER_TYPE_RADIAL);
        //    Setup for a bar starting from the bottom since the midpoint is 0 for the y
        right.setMidpoint(cc.p(0.5, 0.5));
        //    Setup for a vertical bar since the bar change rate is 0 for x meaning no horizontal change
        right.setBarChangeRate(cc.p(0, 1));
        this.addChild(right);
        right.setPosition(cc.p(winSize.width - 150, winSize.height / 2));
        right.runAction(cc.RepeatForever.create(to.copy()));
    }