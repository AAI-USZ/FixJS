function (gid, pos) {
        var rect = this._tileSet.rectForGID(gid);
        rect = cc.RECT_PIXELS_TO_POINTS(rect);

        var z = pos.x + pos.y * this._layerSize.width;
        var tile = this._reusedTileWithRect(rect);

        this._setupTileSprite(tile, pos, gid);
        // optimization:
        // The difference between _appendTileForGID and _insertTileForGID is that append is faster, since
        // it appends the tile at the end of the texture atlas
        //todo fix
        var indexForZ = this._atlasIndexArray.length;

        // don't add it using the "standard" way.
        this.addQuadFromSprite(tile, indexForZ);

        // append should be after addQuadFromSprite since it modifies the quantity values
        this._atlasIndexArray = cc.ArrayAppendObjectToIndex(this._atlasIndexArray, z, indexForZ);
        return tile;
    }