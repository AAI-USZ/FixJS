function () {
        this._super();
        var winSize = cc.Director.getInstance().getWinSize();

        // IMPORTANT:
        // The sprite frames will be cached AND RETAINED, and they won't be released unless you call
        //
        // cc.SpriteFrameCache is a cache of cc.SpriteFrames
        // cc.SpriteFrames each contain a texture id and a rect (frame).
        var cache = cc.SpriteFrameCache.getInstance();
        cache.addSpriteFrames(s_grossini_aliasesPlist, s_grossini_aliases);

        //
        // Animation using Sprite batch
        //
        // A cc.SpriteBatchNode can reference one and only one texture (one .png file)
        // Sprites that are contained in that texture can be instantiatied as cc.Sprites and then added to the cc.SpriteBatchNode
        // All cc.Sprites added to a cc.SpriteBatchNode are drawn in one OpenGL ES draw call
        // If the cc.Sprites are not added to a cc.SpriteBatchNode then an OpenGL ES draw call will be needed for each one, which is less efficient
        //
        // When you animate a sprite, CCAnimation changes the frame of the sprite using setDisplayFrame: (this is why the animation must be in the same texture)
        // When setDisplayFrame: is used in the CCAnimation it changes the frame to one specified by the cc.SpriteFrames that were added to the animation,
        // but texture id is still the same and so the sprite is still a child of the cc.SpriteBatchNode,
        // and therefore all the animation sprites are also drawn as part of the cc.SpriteBatchNode
        //
        var sprite = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
        sprite.setPosition(cc.p(winSize.width * 0.5, winSize.height * 0.5));

        var spriteBatch = cc.SpriteBatchNode.create(s_grossini_aliases);
        spriteBatch.addChild(sprite);
        this.addChild(spriteBatch);

        var animFrames = [];
        var str = "";
        for (var i = 1; i < 15; i++) {
            // Obtain frames by alias name
            str = "dance_" + (i < 10 ? ("0" + i) : i);
            var frame = cache.spriteFrameByName(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.createWithSpriteFrames(animFrames, 0.3);
        // 14 frames * 1sec = 14 seconds
        sprite.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
    }