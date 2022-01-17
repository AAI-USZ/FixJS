function () {
        var s = cc.Director.sharedDirector().getWinSize();
        var cache = cc.SpriteFrameCache.sharedSpriteFrameCache();
        cache.addSpriteFramesWithFile(s_grossiniPlist);
        cache.addSpriteFramesWithFile(s_grossini_grayPlist, s_grossini_gray);

        for (var i = 0; i < 3; i++) {
            //
            // Animation using Sprite BatchNode
            //
            var sprite = cc.Sprite.createWithSpriteFrame(cc.SpriteFrameCache.sharedSpriteFrameCache().spriteFrameByName("grossini_dance_01.png"));
            sprite.setPosition(cc.ccp(s.width / 4 * (i + 1), s.height / 2));

            var point = cc.Sprite.create(s_pathR1);
            point.setScale(0.25);
            point.setPosition(sprite.getPosition());
            this.addChild(point, 1);

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

            var animFrames = [];
            var str = "";
            for (var j = 1; j < 15; j++) {
                str = "grossini_dance_" + (j < 10 ? ("0" + j) : j) + ".png";
                var frame = cache.spriteFrameByName(str);
                animFrames.push(frame);
            }

            var animation = cc.Animation.createWithSpriteFrames(animFrames,0.3);
            sprite.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
            sprite.runAction(cc.RepeatForever.create(cc.RotateBy.create(10, 360)));

            this.addChild(sprite, 0);
        }
    }