function (quantity) {
        cc.Log("cocos2d: cc.ParticleBatchNode: resizing TextureAtlas capacity from [" + this._textureAtlas.getCapacity()
            + "] to [" + quantity + "].");

        if (!this._textureAtlas.resizeCapacity(quantity)) {
            // serious problems
            cc.Log("cocos2d: WARNING: Not enough memory to resize the atlas");
            cc.Assert(false, "XXX: cc.ParticleBatchNode #increaseAtlasCapacity SHALL handle this assert");
        }
    }