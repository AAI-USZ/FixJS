function () {
        if (cc.renderContextType == cc.CANVAS) {
            return cc.SpriteFrame._frameWithTextureForCanvas(this._texture,
                cc.RECT_POINTS_TO_PIXELS(this._rect),
                this._rectRotated,
                this._unflippedOffsetPositionFromCenter,
                cc.SIZE_POINTS_TO_PIXELS(this._contentSize));
        } else {
            return cc.SpriteFrame.create(this._texture,
                cc.RECT_POINTS_TO_PIXELS(this._rect),
                this._rectRotated,
                this._unflippedOffsetPositionFromCenter,
                cc.SIZE_POINTS_TO_PIXELS(this._contentSize));
        }
    }