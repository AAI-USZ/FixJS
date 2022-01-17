function () {
        this.setTouchEnabled(true);
        var sprite = cc.Sprite.create(s_pathGrossini);

        var layer = cc.LayerColor.create(cc.ccc4(255, 255, 0, 100));
        this.addChild(layer, -1);

        this.addChild(sprite, 0, TAG_SPRITE);
        sprite.setPosition(cc.PointMake(20, 150));

        sprite.runAction(cc.JumpTo.create(4, cc.PointMake(300, 48), 100, 4));

        var fadeIn = cc.FadeIn.create(1);
        var fadeOut = cc.FadeOut.create(1);
        var forever = cc.RepeatForever.create(cc.Sequence.create(fadeIn, fadeOut));
        layer.runAction(forever);
    }