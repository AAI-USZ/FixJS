function () {
        // small capacity. Testing resizing.
        // Don't use capacity=1 in your real game. It is expensive to resize the capacity
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 1);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        var s = cc.Director.sharedDirector().getWinSize();

        for (var i = 0; i < 3; i++) {
            var rotate = cc.RotateBy.create(10, 360);
            var action = cc.RepeatForever.create(rotate);
            var sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85 * i, 121, 85, 121));
            sprite.setPosition(cc.ccp(s.width / 4 * (i + 1), s.height / 2));

            var point = cc.Sprite.create(s_pathR1);
            point.setScale(0.25);
            point.setPosition(sprite.getPosition());
            this.addChild(point, 1);

            switch (i) {
                case 0:
                    sprite.setAnchorPoint(cc.PointZero());
                    break;
                case 1:
                    sprite.setAnchorPoint(cc.ccp(0.5, 0.5));
                    break;
                case 2:
                    sprite.setAnchorPoint(cc.ccp(1, 1));
                    break;
            }

            point.setPosition(sprite.getPosition());
            sprite.runAction(action);
            batch.addChild(sprite, i);
        }
    }