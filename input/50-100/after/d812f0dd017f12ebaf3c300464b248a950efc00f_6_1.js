function (pos) {
        cc.Assert(pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y >= 0, "TMXLayer: invalid position");
        cc.Assert(this._tiles && this._atlasIndexArray, "TMXLayer: the tiles map has been released");

        var idx = pos.x + pos.y * this._layerSize.width;
        // Bits on the far end of the 32-bit global tile ID are used for tile flags
        var tile = this._tiles[idx];

        return (tile & cc.FlippedMask)>>>0;
    }