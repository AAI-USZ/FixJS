function (tile, tileWidth, tileHeight, itemsToRender) {
        cc.Assert(tile != null, "title should not be null");
        this._itemWidth = tileWidth;
        this._itemHeight = tileHeight;

        this._opacity = 255;
        this._color = this._colorUnmodified = cc.WHITE();
        this._isOpacityModifyRGB = true;

        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;

        var newAtlas = new cc.TextureAtlas();
        newAtlas.initWithFile(tile, itemsToRender);
        this.setTextureAtlas(newAtlas);

        if (cc.renderContextType == cc.CANVAS) {
            this._originalTexture = this._textureAtlas.getTexture();
        }

        if (!this._textureAtlas) {
            cc.log("cocos2d: Could not initialize cc.AtlasNode. Invalid Texture.");
            return false;
        }

        this._updateBlendFunc();
        this._updateOpacityModifyRGB();

        this._calculateMaxItems();

        this._quadsToDraw = itemsToRender;

        //shader stuff
        //this.setShaderProgram(cc.ShaderCache.getInstance().programForKey(kCCShader_PositionTexture_uColor));
        //this._uniformColor = glGetUniformLocation( this.getShaderProgram().getProgram(), "u_color");

        return true;

    }