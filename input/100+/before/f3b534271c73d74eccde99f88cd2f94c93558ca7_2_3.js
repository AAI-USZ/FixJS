function (pos) {
        cc.Assert(pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y >= 0, "TMXLayer: invalid position");
        cc.Assert(this._tiles && this._atlasIndexArray, "TMXLayer: the tiles map has been released");

        var idx = pos.x + pos.y * this._layerSize.width;
        return this._tiles[idx];
    }