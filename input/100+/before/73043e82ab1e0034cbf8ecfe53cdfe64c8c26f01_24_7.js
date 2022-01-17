function () {
        //
        // This test tests z-order
        // If you are going to use it is better to use a 3D projection
        //
        // WARNING:
        // The developer is resposible for ordering it's sprites according to it's Z if the sprite has
        // transparent parts.
        //
        this._dir = 1;
        this._time = 0;

        var s = cc.Director.sharedDirector().getWinSize();
        var step = s.width / 12;

        var node = cc.Node.create();
        // camera uses the center of the image as the pivoting point
        node.setContentSize(cc.SizeMake(s.width, s.height));
        node.setAnchorPoint(cc.ccp(0.5, 0.5));
        node.setPosition(cc.ccp(s.width / 2, s.height / 2));

        this.addChild(node, 0);

        for (var i = 0; i < 5; i++) {
            var sprite = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85 * 0, 121 * 1, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            sprite.setVertexZ(10 + i * 40);
            node.addChild(sprite, 0);
        }

        for (i = 5; i < 11; i++) {
            var sprite = cc.Sprite.create(s_grossini_dance_atlas, cc.RectMake(85 * 1, 121 * 0, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, s.height / 2));
            sprite.setVertexZ(10 + (10 - i) * 40);
            node.addChild(sprite, 0);
        }

        node.runAction(cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0));
    }