function (texture) {
        // CCSprite: setTexture doesn't work when the sprite is rendered using a CCSpriteSheet
        if (cc.renderContextType != cc.CANVAS) {
            //TODO
            cc.Assert(!this._batchNode, "cc.Sprite: Batched sprites should use the same texture as the batchnode");
        }

        cc.Assert( !texture || texture instanceof cc.Texture2D || texture instanceof HTMLImageElement
            || texture instanceof HTMLCanvasElement, "setTexture expects a CCTexture2D. Invalid argument");
        if(!this._batchNode && this._texture != texture){
            this._texture = texture;
            this._updateBlendFunc();
        }
    }