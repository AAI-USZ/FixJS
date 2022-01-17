function () {
        var s = cc.Director.getInstance().getWinSize();

        // parents
        var batch;
        var sprite1, sprite2, sprite3;
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_grossiniPlist);

        // test 1
        batch = cc.SpriteBatchNode.create(s_grossini, 50);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_01.png"));
        sprite1.setPosition(cc.p(s.width / 3, s.height / 2));

        sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(20, 30));

        sprite3 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(-20, 30));

        batch.addChild(sprite1);
        sprite1.addChild(sprite2, 2);
        sprite1.addChild(sprite3, -2);

        // test 2
        batch = cc.SpriteBatchNode.create(s_grossini, 50);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_01.png"));
        sprite1.setPosition(cc.p(2 * s.width / 3, s.height / 2));

        sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(20, 30));

        sprite3 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(-20, 30));

        batch.addChild(sprite1);
        sprite1.addChild(sprite2, -2);
        sprite1.addChild(sprite3, 2);

        // test 3
        batch = cc.SpriteBatchNode.create(s_grossini, 50);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_01.png"));
        sprite1.setPosition(cc.p(s.width / 2 - 90, s.height / 4));

        sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(s.width / 2 - 60, s.height / 4));

        sprite3 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(s.width / 2 - 30, s.height / 4));

        batch.addChild(sprite1, 10);
        batch.addChild(sprite2, -10);
        batch.addChild(sprite3, -5);

        // test 4
        batch = cc.SpriteBatchNode.create(s_grossini, 50);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_01.png"));
        sprite1.setPosition(cc.p(s.width / 2 + 30, s.height / 4));

        sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(s.width / 2 + 60, s.height / 4));

        sprite3 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(s.width / 2 + 90, s.height / 4));

        batch.addChild(sprite1, -10);
        batch.addChild(sprite2, -5);
        batch.addChild(sprite3, -2);
    }