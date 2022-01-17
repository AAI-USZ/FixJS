function () {
        //
        // This test MUST be done in 'onEnter' and not on 'init'
        // otherwise the paused action will be resumed at 'onEnter' time
        //
        this._super();

        var s = cc.Director.sharedDirector().getWinSize();
        var l = cc.LabelTTF.create("After 5 seconds grossini should move", "Thonburi", 16);
        this.addChild(l);
        l.setPosition(cc.PointMake(s.width / 2, 245));

        //
        // Also, this test MUST be done, after [super onEnter]
        //
        var grossini = cc.Sprite.create(s_pathGrossini);
        this.addChild(grossini, 0, TAG_GROSSINI);
        grossini.setPosition(cc.PointMake(200, 200));

        var action = cc.MoveBy.create(1, cc.PointMake(150, 0));

        cc.Director.sharedDirector().getActionManager().addAction(action, grossini, true);

        this.schedule(this.unpause, 3);
    }