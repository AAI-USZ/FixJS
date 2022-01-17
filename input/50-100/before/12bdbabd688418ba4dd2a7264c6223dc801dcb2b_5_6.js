function () {
        if (cc.renderContextType == cc.CANVAS) {
            return cc.SpriteFrame._frameWithTextureForCanvas(this._texture,
                this._rectInPixels,
                this._rectRotated,
                this._unflippedOffsetPositionFromCenter,
                this._contentSize);
        } else {
            return cc.SpriteFrame.create(this._texture,
                this._rectInPixels,
                this._rectRotated,
                this._unflippedOffsetPositionFromCenter,
                this._contentSize);
        }
    }