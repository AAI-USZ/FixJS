function () {
        var s = cc.Director.sharedDirector().getWinSize();

        for (var i = 0; i < 3; i++) {
            var cache = cc.SpriteFrameCache.sharedSpriteFrameCache();
            cache.addSpriteFramesWithFile(s_grossiniPlist);
            cache.addSpriteFramesWithFile(s_grossini_grayPlist, s_grossini_gray);

            //
            // Animation using Sprite BatchNode
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

            var spritesheet = cc.SpriteBatchNode.create(s_grossini);
            this.addChild(spritesheet);

            var animFrames = [];
            var str = "";
            for (var k = 1; k <= 14; k++) {
                str = "grossini_dance_" + (k < 10 ? ("0" + k) : k) + ".png";
                var frame = cache.spriteFrameByName(str);
                animFrames.push(frame);
            }

            var animation = cc.Animation.create(animFrames);
            sprite.runAction(cc.RepeatForever.create(cc.Animate.create(animation, false)));

            var scale = cc.ScaleBy.create(2, 2);
            var scale_back = scale.reverse();
            var seq_scale = cc.Sequence.create(scale, scale_back, null);
            sprite.runAction(cc.RepeatForever.create(seq_scale));

            spritesheet.addChild(sprite, i);
        }
    }