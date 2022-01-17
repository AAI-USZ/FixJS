function (index) {
        if (index < cc.PROGRESS_TEXTURE_COORDS_COUNT) {
            if (this._reverseDirection) {
                return cc.ccp((cc.PROGRESS_TEXTURE_COORDS >> (7 - (index << 1))) & 1, (cc.PROGRESS_TEXTURE_COORDS >> (7 - ((index << 1) + 1))) & 1);
            } else {
                return cc.ccp((cc.PROGRESS_TEXTURE_COORDS >> ((index << 1) + 1)) & 1, (cc.PROGRESS_TEXTURE_COORDS >> (index << 1)) & 1);
            }
        }
        return cc.PointZero();
    }