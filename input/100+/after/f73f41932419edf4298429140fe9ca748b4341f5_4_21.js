function () {
        var s = cc.Director.getInstance().getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_grossiniPlist);
        //
        // SpriteBatchNode
        //
        // parents
        var aParent = cc.SpriteBatchNode.create(s_grossini, 50);
        this.addChild(aParent, 0);

        // anchor (0,0)
        var sprite1 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_08.png"));
        sprite1.setPosition(cc.p(s.width / 4, s.height / 2));
        sprite1.setAnchorPoint(cc.p(0, 0));

        var sprite2 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(20, 30));

        var sprite3 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(-20, 30));

        var sprite4 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_04.png"));
        sprite4.setPosition(cc.p(0, 0));
        sprite4.setScale(0.5);

        aParent.addChild(sprite1);
        sprite1.addChild(sprite2, -2);
        sprite1.addChild(sprite3, -2);
        sprite1.addChild(sprite4, 3);

        var point = cc.Sprite.create(s_pathR1);
        point.setScale(0.25);
        point.setPosition(sprite1.getPosition());
        this.addChild(point, 10);

        // anchor (0.5, 0.5)
        sprite1 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_08.png"));
        sprite1.setPosition(cc.p(s.width / 2, s.height / 2));
        sprite1.setAnchorPoint(cc.p(0.5, 0.5));

        sprite2 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(20, 30));

        sprite3 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(-20, 30));

        sprite4 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_04.png"));
        sprite4.setPosition(cc.p(0, 0));
        sprite4.setScale(0.5);

        aParent.addChild(sprite1);
        sprite1.addChild(sprite2, -2);
        sprite1.addChild(sprite3, -2);
        sprite1.addChild(sprite4, 3);

        point = cc.Sprite.create(s_pathR1);
        point.setScale(0.25);
        point.setPosition(sprite1.getPosition());
        this.addChild(point, 10);


        // anchor (1,1)
        sprite1 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_08.png"));
        sprite1.setPosition(cc.p(s.width / 2 + s.width / 4, s.height / 2));
        sprite1.setAnchorPoint(cc.p(1, 1));

        sprite2 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_02.png"));
        sprite2.setPosition(cc.p(20, 30));

        sprite3 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_03.png"));
        sprite3.setPosition(cc.p(-20, 30));

        sprite4 = cc.Sprite.createWithSpriteFrameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossini_dance_04.png"));
        sprite4.setPosition(cc.p(0, 0));
        sprite4.setScale(0.5);

        aParent.addChild(sprite1);
        sprite1.addChild(sprite2, -2);
        sprite1.addChild(sprite3, -2);
        sprite1.addChild(sprite4, 3);

        point = cc.Sprite.create(s_pathR1);
        point.setScale(0.25);
        point.setPosition(sprite1.getPosition());
        this.addChild(point, 10);
    }