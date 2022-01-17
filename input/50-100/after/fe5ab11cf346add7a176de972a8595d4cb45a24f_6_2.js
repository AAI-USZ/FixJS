function (pos) {
        var ret = cc.PointZero();
        switch (this._layerOrientation) {
            case cc.TMXOrientationOrtho:
                ret = this._positionForOrthoAt(pos);
                break;
            case cc.TMXOrientationIso:
                ret = this._positionForIsoAt(pos);
                break;
            case cc.TMXOrientationHex:
                ret = this._positionForHexAt(pos);
                break;
        }
        ret = cc.POINT_PIXELS_TO_POINTS(ret);
        return ret;
    }