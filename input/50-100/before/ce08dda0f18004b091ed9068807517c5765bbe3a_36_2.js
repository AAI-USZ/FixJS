function (isBlendAdditive) {
        //TODO
        this._isBlendAdditive = isBlendAdditive;
        return;
        if (isBlendAdditive) {
            //this._blendFunc.src = GL_SRC_ALPHA;
            //this._blendFunc.dst = GL_ONE;
        } else {
            if (this._texture && !this._texture.getHasPremultipliedAlpha()) {
                //this._blendFunc.src = GL_SRC_ALPHA;
                //this._blendFunc.dst = GL_ONE_MINUS_SRC_ALPHA;
            } else {
                this._blendFunc.src = cc.BLEND_SRC;
                this._blendFunc.dst = cc.BLEND_DST;
            }
        }
    }