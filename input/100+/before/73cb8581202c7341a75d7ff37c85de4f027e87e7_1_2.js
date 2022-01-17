function () {
        if (this._isTransformDirty) {
            // Translate values
            var x = this._position.x;
            var y = this._position.y;

            if (this._ignoreAnchorPointForPosition) {
                x += this._anchorPointInPoints.x;
                y += this._anchorPointInPoints.y;
            }

            // Rotation values
            var c = 1, s = 0;
            if (this._rotation) {
                var radians = -cc.DEGREES_TO_RADIANS(this._rotation);
                c = Math.cos(radians);
                s = Math.sin(radians);
            }

            var needsSkewMatrix = ( this._skewX || this._skewY );

            // optimization:
            // inline anchor point calculation if skew is not needed
            if (!needsSkewMatrix && !cc.Point.CCPointEqualToPoint(this._anchorPointInPoints, new cc.Point(0, 0))) {
                x += c * -this._anchorPointInPoints.x * this._scaleX + -s * -this._anchorPointInPoints.y * this._scaleY;
                y += s * -this._anchorPointInPoints.x * this._scaleX + c * -this._anchorPointInPoints.y * this._scaleY;
            }


            // Build Transform Matrix
            this._transform = cc.AffineTransformMake(c * this._scaleX, s * this._scaleX,
                -s * this._scaleY, c * this._scaleY, x, y);

            // XXX: Try to inline skew
            // If skew is needed, apply skew and then anchor point
            if (needsSkewMatrix) {
                var skewMatrix = cc.AffineTransformMake(1.0, Math.tan(cc.DEGREES_TO_RADIANS(this._skewY)),
                    Math.tan(cc.DEGREES_TO_RADIANS(this._skewX)), 1.0, 0.0, 0.0);
                this._transform = cc.AffineTransformConcat(skewMatrix, this._transform);

                // adjust anchor point
                if (!cc.Point.CCPointEqualToPoint(this._anchorPointInPoints, new cc.Point(0, 0))) {
                    this._transform = cc.AffineTransformTranslate(this._transform, -this._anchorPointInPoints.x, -this._anchorPointInPoints.y);
                }
            }

            this._isTransformDirty = false;
        }

        return this._transform;
    }