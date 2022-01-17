function () {
        var s = cc.Director.sharedDirector().getWinSize();

        cc.SpriteFrameCache.sharedSpriteFrameCache().addSpriteFramesWithFile(s_ghostsPlist);
        var aParent = cc.SpriteBatchNode.create(s_ghosts);

        // MySprite1
        var sprite = MySprite1.spriteWithSpriteFrameName("father.gif");
        sprite.setPosition(cc.ccp(s.width / 4, s.height / 2));
        aParent.addChild(sprite);
        this.addChild(aParent);

        // MySprite2
        var sprite2 = MySprite2.spriteWithFile(s_pathGrossini);
        this.addChild(sprite2);
        sprite2.setPosition(cc.ccp(s.width / 4 * 3, s.height / 2));
    }