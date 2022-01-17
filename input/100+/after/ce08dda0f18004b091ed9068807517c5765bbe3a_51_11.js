function (frame) {
        if (cc.renderContextType == cc.CANVAS) {
            if (frame.getTexture() != this._texture)
                return false;
            return cc.Rect.CCRectEqualToRect(frame.getRect(), this._rect);
        } else {
            return (cc.Rect.CCRectEqualToRect(frame.getRect(), this._rect) && frame.getTexture().getName() == this._texture.getName()
                && cc.Point.CCPointEqualToPoint(frame.getOffset(), this._unflippedOffsetPositionFromCenter));
        }
    }