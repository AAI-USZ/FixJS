function () {
        var copy = new cc.SpriteFrame();
        copy.initWithTexture(this._texture, this._rectInPixels, this._rotated, this._offsetInPixels, this._originalSizeInPixels);
        return copy;
    }