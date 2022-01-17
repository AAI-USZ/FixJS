function () {
        // small capacity. Testing resizing
        // Don't use capacity=1 in your real game. It is expensive to resize the capacity
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 1);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);
        batch.ignoreAnchorPointForPosition(true);

        var s = cc.Director.sharedDirector().getWinSize();

        batch.setAnchorPoint(cc.ccp(0.5, 0.5));
        batch.setContentSize(cc.SizeMake(s.width, s.height));

        // SpriteBatchNode actions
        var rotate1 = cc.RotateBy.create(5, 360);
        var rotate_back = rotate1.reverse();
        var rotate_seq = cc.Sequence.create(rotate1, rotate_back, null);
        var rotate_forever = cc.RepeatForever.create(rotate_seq);

        var scale = cc.ScaleBy.create(5, 1.5);
        var scale_back = scale.reverse();
        var scale_seq = cc.Sequence.create(scale, scale_back, null);
        var scale_forever = cc.RepeatForever.create(scale_seq);

        var step = s.width / 4;

        for (var i = 0; i < 3; i++) {
            var sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * i, 121, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));

            var rotate = cc.RotateBy.create(5, 360);
            var action = cc.RepeatForever.create(rotate);
            sprite.runAction(action.copy());
            batch.addChild(sprite, i);
        }

        batch.runAction(scale_forever);
        batch.runAction(rotate_forever);
    }