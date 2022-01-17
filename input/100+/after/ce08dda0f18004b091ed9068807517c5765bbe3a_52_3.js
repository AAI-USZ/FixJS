function (tex, capacity) {
        this._children = [];
        this._descendants = [];

        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this._textureAtlas = new cc.TextureAtlas();
        capacity = capacity || cc.DEFAULT_SPRITE_BATCH_CAPACITY;

        this._textureAtlas.initWithTexture(tex, capacity);
        if (cc.renderContextType == cc.CANVAS) {
            this._originalTexture = tex;
        }
        if (cc.renderContextType == cc.WEBGL) {
            this._updateBlendFunc();
            //this.setShaderProgram(cc.ShaderCache.sharedShaderCache().programForKey(cc.Shader_PositionTextureColor)) ;
        }
        return true;
    }