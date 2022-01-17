function () {
        //
        // This test tests z-order
        // If you are going to use it is better to use a 3D projection
        //
        // WARNING:
        // The developer is resposible for ordering it's sprites according to it's Z if the sprite has
        // transparent parts.
        //
        var s = cc.Director.sharedDirector().getWinSize();
        var step = s.width / 12;

        // small capacity. Testing resizing.
        // Don't use capacity=1 in your real game. It is expensive to resize the capacity
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 1);
        // camera uses the center of the image as the pivoting point
        batch.setContentSize(cc.SizeMake(s.width, s.height));
        batch.setAnchorPoint(cc.ccp(0.5, 0.5));
        batch.setPosition(cc.ccp(s.width / 2, s.height / 2));

        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        for (var i = 0; i < 5; i++) {
            var sprite = cc.Sprite.spriteWithTexture(batch.getTexture(), cc.RectMake(85 * 0, 121 * 1, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            sprite.setVertexZ(10 + i * 40);
            batch.addChild(sprite, 0);

        }

        for (i = 5; i < 11; i++) {
            var sprite = cc.Sprite.spriteWithTexture(batch.getTexture(), cc.RectMake(85 * 1, 121 * 0, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            sprite.setVertexZ(10 + (10 - i) * 40);
            batch.addChild(sprite, 0);
        }

        batch.runAction(cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0));
    }