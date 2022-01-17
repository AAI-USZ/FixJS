function () {
        this.setTouchEnabled(true);

        var BatchNode = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 50);
        this.addChild(BatchNode, 0, TAG_SPRITE_BATCH_NODE);

        var s = cc.Director.sharedDirector().getWinSize();
        this.addNewSpriteWithCoords(cc.ccp(s.width / 2, s.height / 2));
    }