function () {
        var s = cc.Director.getInstance().getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ghostsPlist);

        var rot = cc.RotateBy.create(10, 360);
        var seq = cc.RepeatForever.create(rot);

        var rot_back = rot.reverse();
        var rot_back_fe = cc.RepeatForever.create(rot_back);

        //
        // SpriteBatchNode: 3 levels of children
        //
        var aParent = cc.Node.create();
        this.addChild(aParent);

        // parent
        var l1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("father.gif"));
        l1.setPosition(cc.p(s.width / 2, s.height / 2));
        l1.runAction(seq.copy());
        aParent.addChild(l1);
        var l1Size = l1.getContentSize();

        // child left
        var l2a = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("sister1.gif"));
        l2a.setPosition(cc.p(-50 + l1Size.width / 2, 0 + l1Size.height / 2));
        l2a.runAction(rot_back_fe.copy());
        l1.addChild(l2a);
        var l2aSize = l2a.getContentSize();


        // child right
        var l2b = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("sister2.gif"));
        l2b.setPosition(cc.p(+50 + l1Size.width / 2, 0 + l1Size.height / 2));
        l2b.runAction(rot_back_fe.copy());
        l1.addChild(l2b);
        var l2bSize = l2a.getContentSize();


        // child left bottom
        var l3a1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("child1.gif"));
        l3a1.setScale(0.45);
        l3a1.setPosition(cc.p(0 + l2aSize.width / 2, -100 + l2aSize.height / 2));
        l2a.addChild(l3a1);

        // child left top
        var l3a2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("child1.gif"));
        l3a2.setScale(0.45);
        l3a1.setPosition(cc.p(0 + l2aSize.width / 2, +100 + l2aSize.height / 2));
        l2a.addChild(l3a2);

        // child right bottom
        var l3b1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("child1.gif"));
        l3b1.setScale(0.45);
        l3b1.setFlipY(true);
        l3b1.setPosition(cc.p(0 + l2bSize.width / 2, -100 + l2bSize.height / 2));
        l2b.addChild(l3b1);

        // child right top
        var l3b2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName(cc.SpriteFrameCache.getInstance().spriteFrameByName("child1.gif"));
        l3b2.setScale(0.45);
        l3b2.setFlipY(true);
        l3b1.setPosition(cc.p(0 + l2bSize.width / 2, +100 + l2bSize.height / 2));
        l2b.addChild(l3b2);
    }