function () {
        var s = cc.Director.sharedDirector().getWinSize();

        var sprite1 = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85, 121, 85, 121));
        sprite1.setPosition(cc.ccp(s.width / 2 - 100, s.height / 2));
        this.addChild(sprite1, 0, TAG_SPRITE1);

        var sprite2 = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85, 121, 85, 121));
        sprite2.setPosition(cc.ccp(s.width / 2 + 100, s.height / 2));
        this.addChild(sprite2, 0, TAG_SPRITE2);

        var scale = cc.ScaleBy.create(2, 5);
        var scale_back = scale.reverse();
        var seq = cc.Sequence.create(scale, scale_back, null);
        var repeat = cc.RepeatForever.create(seq);

        var scale2 = cc.ScaleBy.create(2, 5);
        var scale_back2 = scale2.reverse();
        var seq2 = cc.Sequence.create(scale2, scale_back2, null);
        var repeat2 = cc.RepeatForever.create(seq2);

        sprite1.runAction(repeat);
        sprite2.runAction(repeat2);
    }