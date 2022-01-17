function () {
        if (!this._textureAtlas.getTexture().hasPremultipliedAlpha()) {
            this._blendFunc.src = cc.GL_SRC_ALPHA;
            this._blendFunc.dst = cc.GL_ONE_MINUS_SRC_ALPHA;
        }
    }