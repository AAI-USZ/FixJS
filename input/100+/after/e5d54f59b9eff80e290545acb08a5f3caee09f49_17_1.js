function () {
        this._super();
        this.setTouchEnabled(true);
        var label = cc.LabelTTF.create("Touch to popScene", "Arial", 28);
        this.addChild(label);
        var s = cc.Director.sharedDirector().getWinSize();
        label.setPosition(cc.PointMake(s.width / 2, s.height / 2));

        var sprite = cc.Sprite.create(s_pathGrossini);
        this.addChild(sprite);

        sprite.setPosition(cc.PointMake(s.width - 40, s.height / 2));
        var rotate = cc.RotateBy.create(2, 360);
        var repeat = cc.RepeatForever.create(rotate);
        sprite.runAction(repeat);
    }