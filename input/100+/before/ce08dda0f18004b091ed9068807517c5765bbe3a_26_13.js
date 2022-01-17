function () {
        this._super();

        // create a transparent color layer
        // in which we are going to add our rendertextures
        var color = new cc.Color4B(0, 0, 0, 0);
        var size = cc.Director.sharedDirector().getWinSize();
        var layer = cc.LayerColor.create(color);

        // create the first render texture for inScene
        var inTexture = cc.RenderTexture.create(size.width, size.height);

        if (null == inTexture) {
            return;
        }

        inTexture.getSprite().setAnchorPoint(cc.ccp(0.5, 0.5));
        inTexture.setPosition(cc.ccp(size.width / 2, size.height / 2));
        inTexture.setAnchorPoint(cc.ccp(0.5, 0.5));

        // render inScene to its texturebuffer
        inTexture.begin();
        this._inScene.visit();
        inTexture.end();

        // create the second render texture for outScene
        var outTexture = cc.RenderTexture.create(size.width, size.height);
        outTexture.getSprite().setAnchorPoint(cc.ccp(0.5, 0.5));
        outTexture.setPosition(cc.ccp(size.width / 2, size.height / 2));
        outTexture.setAnchorPoint(cc.ccp(0.5, 0.5));

        // render outScene to its texturebuffer
        outTexture.begin();
        this._outScene.visit();
        outTexture.end();

        // create blend functions

        var blend1 = new cc.BlendFunc(cc.GL_ONE, cc.GL_ONE); // inScene will lay on background and will not be used with alpha
        var blend2 = cc.BlendFunc(cc.GL_SRC_ALPHA, cc.GL_ONE_MINUS_SRC_ALPHA); // we are going to blend outScene via alpha

        // set blendfunctions
        inTexture.getSprite().setBlendFunc(blend1);
        outTexture.getSprite().setBlendFunc(blend2);

        // add render textures to the layer
        layer.addChild(inTexture);
        layer.addChild(outTexture);

        // initial opacity:
        inTexture.getSprite().setOpacity(255);
        outTexture.getSprite().setOpacity(255);

        // create the blend action
        //TODO
        var layerAction = cc.Sequence.create
            (
                cc.FadeTo.create(this._duration, 0),
                cc.CallFunc.create(this, this.hideOutShowIn),
                cc.CallFunc.create(this, this.finish),
                null
            );

        // run the blend action
        outTexture.getSprite().runAction(layerAction);

        // add the layer (which contains our two rendertextures) to the scene
        this.addChild(layer, 2, cc.SCENE_FADE);
    }