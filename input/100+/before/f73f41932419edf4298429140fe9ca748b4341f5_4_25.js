function () {
        var winSize = cc.Director.getInstance().getWinSize();

        cc.SpriteFrameCache.getInstance().addSpriteFrames(s_ghostsPlist);
        //
        // SpriteBatchNode: 3 levels of children
        //
        var aParent = cc.SpriteBatchNode.create(s_ghosts);

        this._batchNode = aParent;
        //[[aParent texture] generateMipmap];
        this.addChild(aParent);

        // parent
        var l1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("father.gif");
        l1.setPosition(cc.p(winSize.width / 2, winSize.height / 2));

        aParent.addChild(l1);
        var l1Size = l1.getContentSize();

        // child left
        var l2a = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("sister1.gif");
        l2a.setPosition(cc.p(-10 + l1Size.width / 2, 0 + l1Size.height / 2));

        l1.addChild(l2a, 1);
        var l2aSize = l2a.getContentSize();

        // child right
        var l2b = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("sister2.gif");
        l2b.setPosition(cc.p(+50 + l1Size.width / 2, 0 + l1Size.height / 2));

        l1.addChild(l2b, 2);
        var l2bSize = l2a.getContentSize();

        // child left bottom
        var l3a1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("child1.gif");
        l3a1.setScale(0.45);
        l3a1.setPosition(cc.p(0 + l2aSize.width / 2, -50 + l2aSize.height / 2));
        l2a.addChild(l3a1, 1);

        // child left top
        var l3a2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("child1.gif");
        l3a2.setScale(0.45);
        l3a2.setPosition(cc.p(0 + l2aSize.width / 2, +50 + l2aSize.height / 2));
        l2a.addChild(l3a2, 2);

        this._reoderSprite = l2a;

        // child right bottom
        var l3b1 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("child1.gif");
        l3b1.setScale(0.45);
        l3b1.setFlipY(true);
        l3b1.setPosition(cc.p(0 + l2bSize.width / 2, -50 + l2bSize.height / 2));
        l2b.addChild(l3b1);

        // child right top
        var l3b2 = cc.Sprite.createWithSpriteFrameNameNameNameNameNameNameNameNameName("child1.gif");
        l3b2.setScale(0.45);
        l3b2.setFlipY(true);
        l3b2.setPosition(cc.p(0 + l2bSize.width / 2, +50 + l2bSize.height / 2));
        l2b.addChild(l3b2);

        this.scheduleOnce(this.reorderSprite, 2.0);
    }