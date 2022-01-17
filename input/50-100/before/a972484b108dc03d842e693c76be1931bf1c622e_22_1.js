function () {
        // if we're going beyond the current TextureAtlas's capacity,
        // all the previously initialized sprites will need to redo their texture coords
        // this is likely computationally expensive
        var quantity = (this._textureAtlas.getCapacity() + 1) * 4 / 3;

        cc.Log("cocos2d: CCSpriteBatchNode: resizing TextureAtlas capacity from " + this._textureAtlas.getCapacity() + " to [" + quantity + "].");

        if (!this._textureAtlas.resizeCapacity(quantity)) {
            // serious problems
            cc.Log("cocos2d: WARNING: Not enough memory to resize the atlas");
            cc.Assert(false, "Not enough memory to resize the atla");
        }
    }