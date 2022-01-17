function () {
        if (!this._textureAtlas.getTexture().getHasPremultipliedAlpha()) {
            this._blendFunc.src = cc.GL_SRC_ALPHA;
            this._blendFunc.dst = cc.GL_ONE_MINUS_SRC_ALPHA;
        }
    }