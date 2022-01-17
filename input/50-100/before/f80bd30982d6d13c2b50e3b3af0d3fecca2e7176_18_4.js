function () {
        this.setIsTouchEnabled(true);

        var batch = cc.SpriteBatchNode.create(s_grossini_dance_atlas, 50);
        this.addChild(batch, 0, TAG_SPRITE_BATCH_NODE);

        this._texture1 = batch.getTexture();
        this._texture2 = cc.TextureCache.sharedTextureCache().addImage(s_grossini_dance_atlas_mono);

        for (var i = 0; i < 30; i++) {
            this.addNewSprite();
        }
    }