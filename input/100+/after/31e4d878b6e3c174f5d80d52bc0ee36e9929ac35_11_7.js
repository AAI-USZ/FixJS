function () {
        //
        // This test tests z-order
        // If you are going to use it is better to use a 3D projection
        //
        // WARNING:
        // The developer is resposible for ordering it's sprites according to it's Z if the sprite has
        // transparent parts.
        //

        //
        // Configure shader to mimic glAlphaTest
        //
        //var alphaTestShader = cc.ShaderCache.sharedShaderCache().programForKey(kCCShader_PositionTextureColorAlphaTest);
        //var alphaValueLocation = glGetUniformLocation(alphaTestShader.getProgram(), kCCUniformAlphaTestValue);

        // set alpha test value
        // NOTE: alpha test shader is hard-coded to use the equivalent of a glAlphaFunc(GL_GREATER) comparison
        //if (this.getShaderProgram()){
        //    this.getShaderProgram().setUniformLocationWith1f(alphaValueLocation, 0.0);
        //}

        var winSize = cc.Director.sharedDirector().getWinSize();
        var step = winSize.width / 12;

        // small capacity. Testing resizing.
        // Don't use capacity=1 in your real game. It is expensive to resize the capacity
        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 1);
        // camera uses the center of the image as the pivoting point
        batch.setContentSize(cc.SizeMake(winSize.width, winSize.height));
        batch.setAnchorPoint(cc.ccp(0.5, 0.5));
        batch.setPosition(cc.ccp(winSize.width / 2, winSize.height / 2));

        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);
        var sprite;

        for (var i = 0; i < 5; i++) {
            sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(0, 121, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, winSize.height / 2));
            sprite.setVertexZ(10 + i * 40);
            batch.addChild(sprite, 0);

        }

        for (i = 5; i < 11; i++) {
            sprite = cc.Sprite.createWithTexture(batch.getTexture(), cc.RectMake(85, 0, 85, 121));
            sprite.setPosition(cc.ccp((i + 1) * step, winSize.height / 2));
            sprite.setVertexZ(10 + (10 - i) * 40);
            batch.addChild(sprite, 0);
        }

        batch.runAction(cc.OrbitCamera.create(10, 1, 0, 0, 360, 0, 0));
    }