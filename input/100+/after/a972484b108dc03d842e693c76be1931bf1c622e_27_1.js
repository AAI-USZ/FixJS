function (pos) {
        var ret = cc.PointZero();
        switch (this._layerOrientation) {
            case cc.TMXOrientationOrtho:
                ret = cc.p(pos.x * this._mapTileSize.width, -pos.y * this._mapTileSize.height);
                break;
            case cc.TMXOrientationIso:
                ret = cc.p((this._mapTileSize.width / 2) * (pos.x - pos.y),
                    (this._mapTileSize.height / 2 ) * (-pos.x - pos.y));
                break;
            case cc.TMXOrientationHex:
                ret = cc.p(0, 0);
                cc.log("cocos2d:offset for hexagonal map not implemented yet");
                break;
        }
        return ret;
    }