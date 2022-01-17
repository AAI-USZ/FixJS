function () {
        var s = cc.Director.sharedDirector().getWinSize();

        for (var i = 0; i < 3; i++) {
            var cache = cc.SpriteFrameCache.sharedSpriteFrameCache();
            cache.addSpriteFramesWithFile(s_grossiniPlist);
            cache.addSpriteFramesWithFile(s_grossini_grayPlist, s_grossini_gray);

            //
            // Animation using Sprite batch
            //
            var sprite = cc.Sprite.createWithSpriteFrame(cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("grossini_dance_01.png"));
            sprite.setPosition(cc.ccp(s.width / 4 * (i + 1), s.height / 2));

            var point = cc.Sprite.create(s_pathR1);
            point.setScale(0.25);
            point.setPosition(sprite.getPosition());
            this.addChild(point, 200);

            switch (i) {
                case 0:
                    sprite.setAnchorPoint(cc.PointZero());
                    break;
                case 1:
                    sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
                    break;
                case 2:
                    sprite.setAnchorPoint(cc.ccp(1, 1));
                    break;
            }

            point.setPosition(sprite.getPosition());

            var spritebatch = cc.SpriteBatchNode.create(s_grossini);
            this.addChild(spritebatch);

            var animFrames = [];
            var tmp = "";
            for (var j = 1; j <= 14; j++) {
                tmp = "grossini_dance_" + (j < 10 ? ("0" + j) : j) + ".png";
                var frame = cache.spriteFrameByName(tmp);
                animFrames.push(frame);
            }

            var animation = cc.Animation.create(animFrames);
            sprite.runAction(cc.RepeatForever.create(cc.Animate.create(2.8, animation, false)));

            animFrames = null;

            var skewX = cc.SkewBy.create(2, 45, 0);
            var skewX_back = skewX.reverse();
            var skewY = cc.SkewBy.create(2, 0, 45);
            var skewY_back = skewY.reverse();

            var seq_skew = cc.Sequence.create(skewX, skewX_back, skewY, skewY_back);
            sprite.runAction(cc.RepeatForever.create(seq_skew));

            spritebatch.addChild(sprite, i);
        }
    }