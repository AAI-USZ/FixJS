function (texture, rect, rotated, offset, originalSize) {
        var argnum = arguments.length;
        switch (argnum) {
        /** Initializes a cc.SpriteFrame with a texture, rect in points.
         It is assumed that the frame was not trimmed.
         */
            case 2:
                var rectInPixels = cc.RECT_POINTS_TO_PIXELS(rect);
                return this.initWithTexture(texture, rectInPixels, false, cc.PointZero(), rectInPixels.size);
                break;

        /** Initializes a cc.SpriteFrame with a texture, rect, rotated, offset and originalSize in pixels.
         The originalSize is the size in points of the frame before being trimmed.
         */
            case 5:
                this._texture = texture;
                this._rectInPixels = rect;

                this._rect = cc.RECT_PIXELS_TO_POINTS(rect);
                this._rotated = rotated;
                this._offsetInPixels = offset;
                this._originalSizeInPixels = originalSize;
                return true;
                break;

            default:
                throw "Argument must be non-nil ";
                break;
        }
    }