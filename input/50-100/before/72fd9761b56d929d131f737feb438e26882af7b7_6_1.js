function (texture) {
        //TODO
        this._texture = texture;

        if ((texture instanceof HTMLImageElement) || (texture instanceof HTMLCanvasElement)) {

        } else {
            // If the new texture has No premultiplied alpha, AND the blendFunc hasn't been changed, then update it
            if (this._texture && !this._texture.getHasPremultipliedAlpha() &&
                ( this._blendFunc.src == cc.BLEND_SRC && this._blendFunc.dst == cc.BLEND_DST )) {
                this._blendFunc.src = GL_SRC_ALPHA;
                this._blendFunc.dst = GL_ONE_MINUS_SRC_ALPHA;
            }
        }
    }