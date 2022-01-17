function () {
        var s = cc.Director.getInstance().getWinSize();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_grossini_familyPlist);

        var rot = cc.RotateBy.create(10, 360);
        var seq = cc.RepeatForever.create(rot);

        //
        // Children + Scale using Sprite
        // Test 1
        //
        var aParent = cc.Node.create();
        var sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister1.png"));
        sprite1.setPosition(cc.p(s.width / 4, s.height / 4));
        sprite1.setScaleX(0.5);
        sprite1.setScaleY(2.0);
        sprite1.runAction(seq);


        var sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister2.png"));
        sprite2.setPosition(cc.p(50, 0));

        this.addChild(aParent);
        aParent.addChild(sprite1);
        sprite1.addChild(sprite2);

        rot = cc.RotateBy.create(10, 360);
        seq = cc.RepeatForever.create(rot);
        //
        // Children + Scale using SpriteBatchNode
        // Test 2
        //
        aParent = cc.SpriteBatchNode.create(s_grossini_family);
        sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister1.png"));
        sprite1.setPosition(cc.p(3 * s.width / 4, s.height / 4));
        sprite1.setScaleX(0.5);
        sprite1.setScaleY(2.0);
        sprite1.runAction(seq);

        sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister2.png"));
        sprite2.setPosition(cc.p(50, 0));

        this.addChild(aParent);
        aParent.addChild(sprite1);
        sprite1.addChild(sprite2);

        rot = cc.RotateBy.create(10, 360);
        seq = cc.RepeatForever.create(rot);
        //
        // Children + Scale using Sprite
        // Test 3
        //
        aParent = cc.Node.create();
        sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister1.png"));
        sprite1.setPosition(cc.p(s.width / 4, 2 * s.height / 3));
        sprite1.setScaleX(1.5);
        sprite1.setScaleY(0.5);
        sprite1.runAction(seq);

        sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister2.png"));
        sprite2.setPosition(cc.p(50, 0));

        this.addChild(aParent);
        aParent.addChild(sprite1);
        sprite1.addChild(sprite2);

        rot = cc.RotateBy.create(10, 360);
        seq = cc.RepeatForever.create(rot);
        //
        // Children + Scale using Sprite
        // Test 4
        //
        aParent = cc.SpriteBatchNode.create(s_grossini_family);
        sprite1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister1.png"));
        sprite1.setPosition(cc.p(3 * s.width / 4, 2 * s.height / 3));
        sprite1.setScaleX(1.5);
        sprite1.setScaleY(0.5);
        sprite1.runAction(seq);

        sprite2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("grossinis_sister2.png"));
        sprite2.setPosition(cc.p(50, 0));

        this.addChild(aParent);
        aParent.addChild(sprite1);
        sprite1.addChild(sprite2);
    }