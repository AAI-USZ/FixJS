function () {
        this._super();
        var s = cc.Director.getInstance().getWinSize();

        // IMPORTANT:
        // The sprite frames will be cached AND RETAINED, and they won't be released unless you call
        //     cc.SpriteFrameCache.getInstance().removeUnusedSpriteFrames);
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(s_grossiniPlist);
        cache.addSpriteFrames(s_grossini_grayPlist, s_grossini_gray);
        cache.addSpriteFrames(s_grossini_bluePlist, s_grossini_blue);

        //
        // Animation using Sprite BatchNode
        //
        this._sprite1 = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
        this._sprite1.setPosition(cc.p(s.width / 2 - 80, s.height / 2));

        var spritebatch = cc.SpriteBatchNode.create(s_grossini);
        spritebatch.addChild(this._sprite1);
        this.addChild(spritebatch);

        var animFrames = [];
        var str = "";
        for (var i = 1; i < 15; i++) {
            str = "grossini_dance_" + (i < 10 ? ("0" + i) : i) + ".png";
            var frame = cache.spriteFrameByName(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.createWithSpriteFrames(animFrames, 0.3);
        this._sprite1.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));

        // to test issue #732, uncomment the following line
        this._sprite1.setFlipX(false);
        this._sprite1.setFlipY(false);

        //
        // Animation using standard Sprite
        //
        this._sprite2 = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
        this._sprite2.setPosition(cc.p(s.width / 2 + 80, s.height / 2));
        this.addChild(this._sprite2);

        var moreFrames = [];
        for (i = 1; i < 15; i++) {
            str = "grossini_dance_gray_" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = cache.spriteFrameByName(str);
            moreFrames.push(frame);
        }

        for (i = 1; i < 5; i++) {
            str = "grossini_blue_0" + i + ".png";
            frame = cache.spriteFrameByName(str);
            moreFrames.push(frame);
        }

        // append frames from another batch
        moreFrames = moreFrames.concat(animFrames);
        var animMixed = cc.Animation.createWithSpriteFrames(moreFrames, 0.3);

        this._sprite2.runAction(cc.RepeatForever.create(cc.Animate.create(animMixed)));

        // to test issue #732, uncomment the following line
        this._sprite2.setFlipX(false);
        this._sprite2.setFlipY(false);

        this.schedule(this.startIn05Secs, 0.5);
        this._counter = 0;
    }