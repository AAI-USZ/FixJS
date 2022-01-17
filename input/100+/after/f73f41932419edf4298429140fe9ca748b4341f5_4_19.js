function () {
        var s = cc.Director.getInstance().getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_grossiniPlist);
        //
        // SpriteBatchNode
        //
        // parents
        var aParent = cc.SpriteBatchNode.create(s_grossini, 50);
        aParent.setPosition(cc.p(s.width / 3, s.height / 2));
        this.addChild(aParent, 0);

        var sprite1 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_01.png"));
        sprite1.setPosition(cc.p(0, 0));

        var sprite2 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(20, 30));

        var sprite3 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(-20, 30));

        // test issue #665
        sprite1.setVisible(false);

        aParent.addChild(sprite1);
        sprite1.addChild(sprite2, -2);
        sprite1.addChild(sprite3, 2);

        //
        // Sprite
        //
        aParent = cc.Node.create();
        aParent.setPosition(cc.p(2 * s.width / 3, s.height / 2));
        this.addChild(aParent, 0);

        sprite1 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_01.png"));
        sprite1.setPosition(cc.p(0, 0));

        sprite2 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(20, 30));

        sprite3 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(-20, 30));

        // test issue #665
        sprite1.setVisible(false);

        aParent.addChild(sprite1);
        sprite1.addChild(sprite2, -2);
        sprite1.addChild(sprite3, 2);
    }