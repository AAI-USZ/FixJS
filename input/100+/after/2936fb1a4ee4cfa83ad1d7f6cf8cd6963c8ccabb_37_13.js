function () {
        if (cc.renderContextType == cc.WEBGL) {
            //TODO
            cc.Assert(!this._batchNode, "cc.Sprite: _updateBlendFunc doesn't work when the sprite is rendered using a cc.SpriteSheet");
            // it's possible to have an untextured sprite
            if (!this._texture || !this._texture.hasPremultipliedAlpha()) {
                this._blendFunc.src = cc.GL_SRC_ALPHA;
                this._blendFunc.dst = cc.GL_ONE_MINUS_SRC_ALPHA;
                this.setOpacityModifyRGB(false);
            } else {
                this._blendFunc.src = cc.BLEND_SRC;
                this._blendFunc.dst = cc.BLEND_DST;
                this.setOpacityModifyRGB(true);
            }
        }
    }