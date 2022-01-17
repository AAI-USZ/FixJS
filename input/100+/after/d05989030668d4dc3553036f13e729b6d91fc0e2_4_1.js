function (tex, capacity) {
        this._children = [];
        this._descendants = [];

        this._blendFunc.src = cc.BLEND_SRC;
        this._blendFunc.dst = cc.BLEND_DST;
        this._textureAtlas = new cc.TextureAtlas();
        this._textureAtlas.initWithTexture(tex, capacity);
        if (cc.renderContextType == cc.CANVAS) {
            this._originalTexture = tex;
        }
        if (cc.renderContextType == cc.WEBGL) {
            this._updateBlendFunc();
        }
        // no lazy alloc in this node
        return true;
    }