function () {
        if (this._isTransformDirty) {
            this._transform = cc.AffineTransformIdentity();
            if (!this._isRelativeAnchorPoint && !cc.Point.CCPointEqualToPoint(this._anchorPointInPixels, cc.PointZero())) {
                this._transform = cc.AffineTransformTranslate(this._transform, this._anchorPointInPixels.x, this._anchorPointInPixels.y);
            }

            if (!cc.Point.CCPointEqualToPoint(this._positionInPixels, cc.PointZero())) {
                this._transform = cc.AffineTransformTranslate(this._transform, this._positionInPixels.x, this._positionInPixels.y);
            }

            if (this._rotation != 0) {
                this._transform = cc.AffineTransformRotate(this._transform, -cc.DEGREES_TO_RADIANS(this._rotation));
            }

            if (this._skewX != 0 || this._skewY != 0) {
                // create a skewed coordinate system
                var skew = cc.AffineTransformMake(1.0, Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)), Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)), 1.0, 0.0, 0.0);
                // apply the skew to the transform
                this._transform = cc.AffineTransformConcat(skew, this._transform);
            }

            if (!(this._scaleX == 1 && this._scaleY == 1)) {
                this._transform = cc.AffineTransformScale(this._transform, this._scaleX, this._scaleY);
            }

            if (!cc.Point.CCPointEqualToPoint(this._anchorPointInPixels, cc.PointZero())) {
                this._transform = cc.AffineTransformTranslate(this._transform, -this._anchorPointInPixels.x, -this._anchorPointInPixels.y);
            }

            this._isTransformDirty = false;
        }

        return this._transform;
    }