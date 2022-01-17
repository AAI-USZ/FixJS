function () {
        if (cc.NODE_TRANSFORM_USING_AFFINE_MATRIX) {
            this._isTransformGLDirty = true;
            this._transformGL = 0.0;
        }
        this._anchorPoint = new cc.Point(0, 0);
        this._anchorPointInPixels = new cc.Point(0, 0);
        this._contentSize = new cc.Size(0, 0);
        this._contentSizeInPixels = new cc.Size(0, 0);
    }