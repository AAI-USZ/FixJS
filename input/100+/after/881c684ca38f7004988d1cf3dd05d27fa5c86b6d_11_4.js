function () {
        this._dir = 1;

        // small capacity. Testing resizing.
        // Don't use capacity=1 in your real game. It is expensive to resize the capacity
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 1);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        var s = cc.Director.sharedDirector().getWinSize();
        var sprite;
        var step = s.width / 11;
        for (var i = 0; i < 5; i++) {
            sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 0, 121 * 1, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            batch.addChild(sprite, i);
        }

        for (i = 5; i < 10; i++) {
            sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 1, 121 * 0, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            batch.addChild(sprite, 14 - i);
        }

        sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * 3, 121 * 0, 85, 121));
        batch.addChild(sprite, -1, TAG_SPRITE1);
        sprite.setPosition(cc.ccp(s.width / 2, s.height / 2 - 20));
        sprite.setScaleX(10);
        sprite.setColor(cc.RED());

        this.schedule(this.reorderSprite, 1);
    }