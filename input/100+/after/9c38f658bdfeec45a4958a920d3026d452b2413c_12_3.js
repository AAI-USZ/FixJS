function () {
        var s = cc.Director.sharedDirector().getWinSize();

        // Testing issue #744
        // http://code.google.com/p/cocos2d-iphone/issues/detail?id=744
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 15);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        var sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(0, 0, 85, 121));
        sprite.setPosition(cc.ccp(s.width / 2, s.height / 2));
        batch.addChild(sprite, 3);
        batch.reorderChild(sprite, 1);
    }