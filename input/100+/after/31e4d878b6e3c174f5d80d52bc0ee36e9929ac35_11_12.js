function () {
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 10);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        var s = cc.Director.sharedDirector().getWinSize();

        var sprite1 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85, 121, 85, 121));
        sprite1.setPosition(cc.ccp(s.width / 2 - 100, s.height / 2));
        batch.addChild(sprite1, 0, TAG_SPRITE1);

        var sprite2 = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85, 121, 85, 121));
        sprite2.setPosition(cc.ccp(s.width / 2 + 100, s.height / 2));
        batch.addChild(sprite2, 0, TAG_SPRITE2);

        this.schedule(this.flipSprites, 1);
    }