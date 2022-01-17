function () {
        var s = cc.Director.getInstance().getWinSize();

        // parents
        var parent1 = cc.Node.create();
        var parent2 = cc.SpriteBatchNode.create(s_grossini, 50);

        this.addChild(parent1, 0, TAG_NODE);
        this.addChild(parent2, 0, TAG_SPRITE_BATCH_NODE);

        // IMPORTANT:
        // The sprite frames will be cached AND RETAINED, and they won't be released unless you call
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_grossiniPlist);

        // create 250 sprites
        // only show 80% of them
        for (var i = 1; i <= 250; i++) {
            var spriteIdx = Math.round(cc.RANDOM_0_1() * 14);
            if (spriteIdx == 0)
                spriteIdx = 1;
            var str = "grossini_dance_" + (spriteIdx < 10 ? ("0" + spriteIdx) : spriteIdx) + ".png";

            var frame = cc.SpriteFrameCache.getInstance().spriteFrameByName(str);
            var sprite = cc.Sprite.createWithSpriteFrameName(frame);
            parent1.addChild(sprite, i, i);

            var x = -1000;
            var y = -1000;
            if (cc.RANDOM_0_1() < 0.2) {
                x = cc.RANDOM_0_1() * s.width;
                y = cc.RANDOM_0_1() * s.height;
            }
            sprite.setPosition(cc.p(x, y));

            var action = cc.RotateBy.create(4, 360);
            sprite.runAction(cc.RepeatForever.create(action));
        }

        this._usingSpriteBatchNode = false;

        this.schedule(this.reparentSprite, 2);
    }