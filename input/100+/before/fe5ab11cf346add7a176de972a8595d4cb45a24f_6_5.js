function (pos) {
        var xy = cc.PointMake(pos.x * this._mapTileSize.width,
            (this._layerSize.height - pos.y - 1) * this._mapTileSize.height);
        return xy;
    }