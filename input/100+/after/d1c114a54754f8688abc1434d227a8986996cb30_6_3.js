function () {
        this._super();

        var s = cc.Director.sharedDirector().getWinSize();
        var l = cc.LabelTTF.create("Grossini only rotate/scale in 3 seconds", "Thonburi", 16);
        this.addChild(l);
        l.setPosition(cc.PointMake(s.width / 2, 245));

        var grossini = cc.Sprite.create(s_pathGrossini);
        this.addChild(grossini, 0, TAG_GROSSINI);
        grossini.setPosition(cc.PointMake(s.width / 2, s.height / 2));

        grossini.runAction(cc.ScaleBy.create(2, 2));

        cc.Director.sharedDirector().getActionManager().pauseTarget(grossini);
        grossini.runAction(cc.RotateBy.create(2, 360));

        this.schedule(this.resumeGrossini, 3.0);
    }