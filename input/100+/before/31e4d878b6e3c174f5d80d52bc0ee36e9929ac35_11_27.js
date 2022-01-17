function () {
        var s = cc.Director.sharedDirector().getWinSize();
        var texture = cc.TextureCache.sharedTextureCache().addImage(s_dragon_animation);

        // manually add frames to the frame cache
        var frame0 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 0, 132 * 0, 132, 132));
        var frame1 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 1, 132 * 0, 132, 132));
        var frame2 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 2, 132 * 0, 132, 132));
        var frame3 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 3, 132 * 0, 132, 132));
        var frame4 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 0, 132 * 1, 132, 132));
        var frame5 = cc.SpriteFrame.create(texture, cc.RectMake(132 * 1, 132 * 1, 132, 132));

        //
        // Animation using Sprite BatchNode
        //
        var sprite = cc.Sprite.createWithSpriteFrame(frame0);
        sprite.setPosition(cc.ccp(s.width / 2 , s.height / 2));
        this.addChild(sprite);

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        animFrames.push(frame2);
        animFrames.push(frame3);
        animFrames.push(frame4);
        animFrames.push(frame5);

        var animation = cc.Animation.createWithSpriteFrames(animFrames, 0.2);
        var animate = cc.Animate.create(animation);
        var seq = cc.Sequence.create(animate,
            cc.FlipX.create(true),
            animate.copy(),
            cc.FlipX.create(false));

        sprite.runAction(cc.RepeatForever.create(seq));
    }