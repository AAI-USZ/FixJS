function () {
        var s = cc.Director.sharedDirector().getWinSize();

        var p = cc.ccp(cc.RANDOM_0_1() * s.width, cc.RANDOM_0_1() * s.height);

        var idx = 0 | (cc.RANDOM_0_1() * 14);
        var x = (idx % 5) * 85;
        var y = (0 | (idx / 5)) * 121;


        var node = this.getChildByTag(TAG_SPRITE_BATCH_NODE);
        var sprite = cc.Sprite.createWithTexture(this._texture1, cc.RectMake(x, y, 85, 121));
        node.addChild(sprite);

        sprite.setPosition(cc.ccp(p.x, p.y));

        var action;
        var random = cc.RANDOM_0_1();

        if (random < 0.20)
            action = cc.ScaleBy.create(3, 2);
        else if (random < 0.40)
            action = cc.RotateBy.create(3, 360);
        else if (random < 0.60)
            action = cc.Blink.create(1, 3);
        // else if (random < 0.8)
        //     action = cc.TintBy.create(2, 0, -255, -255);
        else
            action = cc.FadeOut.create(2);

        var action_back = action.reverse();
        var seq = cc.Sequence.create(action, action_back, null);

        sprite.runAction(cc.RepeatForever.create(seq));
    }