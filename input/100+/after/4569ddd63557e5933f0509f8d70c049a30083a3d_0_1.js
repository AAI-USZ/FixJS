function(){
        this._super();

        this._setupTransition();

        // create a transparent color layer
        // in which we are going to add our rendertextures
        var winSize = cc.Director.sharedDirector().getWinSize();

        // create the second render texture for outScene
        var texture = cc.RenderTexture.create(winSize.width, winSize.height);
        texture.getSprite().setAnchorPoint(cc.ccp(0.5,0.5));
        texture.setPosition(cc.ccp(winSize.width/2, winSize.height/2));
        texture.setAnchorPoint(cc.ccp(0.5,0.5));

        if(cc.renderContextType == cc.CANVAS){
            // render outScene to its texturebuffer
            texture.clear();
            this._sceneToBeModified.visit(texture.context);
        }else{
            // render outScene to its texturebuffer
            texture.clear(0, 0, 0, 1);
            texture.begin();
            this._sceneToBeModified.visit();
            texture.end();
        }
        //    Since we've passed the outScene to the texture we don't need it.
        if (this._sceneToBeModified == this._outScene) {
            this.hideOutShowIn();
        }
        //    We need the texture in RenderTexture.
        var pNode = this._progressTimerNodeWithRenderTexture(texture);

        // create the blend action
        var layerAction = cc.Sequence.create(
            cc.ProgressFromTo.create(this._duration, this._from, this._to),
            cc.CallFunc.create(this, this.finish));
        // run the blend action
        pNode.runAction(layerAction);

        // add the layer (which contains our two rendertextures) to the scene
        this.addChild(pNode, 2, cc.SCENE_RADIAL);

    }