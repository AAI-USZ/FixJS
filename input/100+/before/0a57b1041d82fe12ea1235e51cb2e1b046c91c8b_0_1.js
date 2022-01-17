function (tile, tileWidth, tileHeight, itemsToRender) {
        cc.Assert(tile != null, "title should not be null");
        this._itemWidth = tileWidth * cc.CONTENT_SCALE_FACTOR();
        this._itemHeight = tileHeight * cc.CONTENT_SCALE_FACTOR();

        this._opacity = 255;
        this._color = this._colorUnmodified = cc.WHITE();
        this._isOpacityModifyRGB = true;

        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;

        // double retain to avoid the autorelease pool
        // also, using: self.textureAtlas supports re-initialization without leaking
        this._textureAtlas = new cc.TextureAtlas();
        this._textureAtlas.initWithFile(tile, itemsToRender);
        if (cc.renderContextType == cc.CANVAS) {
            this._originalTexture = this._textureAtlas.getTexture();
        }
        if (!this._textureAtlas) {
            cc.Log("cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.");
            return false;
        }

        this._updateBlendFunc();
        this._updateOpacityModifyRGB();

        this._calculateMaxItems();

        this._quadsToDraw = itemsToRender;

        return true;

    }