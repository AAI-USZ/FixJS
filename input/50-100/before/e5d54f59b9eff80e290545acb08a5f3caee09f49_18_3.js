function () {
        this.setIsTouchEnabled(true);

        var node = cc.Node.create();
        this.addChild(node, 0, TAG_SPRITE_BATCH_NODE);

        this._texture1 = cc.TextureCache.sharedTextureCache().addImage(s_grossini_dance_atlas);
        this._texture2 = cc.TextureCache.sharedTextureCache().addImage(s_grossini_dance_atlas_mono);

        this._usingTexture1 = true;

        for (var i = 0; i < 30; i++) {
            this.addNewSprite();
        }

    }