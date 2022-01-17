function () {
        var winSize = cc.Director.getInstance().getWinSize();

        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(s_grossiniPlist);
        cache.addSpriteFrames(s_grossini_grayPlist, s_grossini_gray);

        var spritebatch = cc.SpriteBatchNode.create(s_grossini);
        this.addChild(spritebatch);

        for (var i = 0; i < 2; i++) {
            var sprite = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
            sprite.setPosition(cc.p(winSize.width / 4 * (i + 1), winSize.height / 2));

            // Skew
            var skewX = cc.SkewBy.create(2, 45, 0);
            var skewX_back = skewX.reverse();
            var skewY = cc.SkewBy.create(2, 0, 45);
            var skewY_back = skewY.reverse();

            if (i == 1) {
                sprite.setScale(-1.0);
            }

            var seq_skew = cc.Sequence.create(skewX, skewX_back, skewY, skewY_back);
            sprite.runAction(cc.RepeatForever.create(seq_skew));

            var child1 = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
            child1.setPosition(cc.p(sprite.getContentSize().width / 2.0, sprite.getContentSize().height / 2.0));

            child1.setScale(0.8);

            sprite.addChild(child1);

            spritebatch.addChild(sprite, i);
        }
    }