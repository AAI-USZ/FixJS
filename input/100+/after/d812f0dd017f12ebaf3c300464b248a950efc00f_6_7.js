function (gid, pos) {
        var rect = this._tileSet.rectForGID(gid);
        rect = cc.RectMake(rect.origin.x / this._contentScaleFactor, rect.origin.y / this._contentScaleFactor,
            rect.size.width / this._contentScaleFactor, rect.size.height / this._contentScaleFactor);
        var z = pos.x + pos.y * this._layerSize.width;

        var tile = this._reusedTileWithRect(rect);

        this._setupTileSprite(tile, pos, gid);

        // get atlas index
        var indexForZ = this._atlasIndexForExistantZ(z);
        tile.setAtlasIndex(indexForZ);
        tile.setDirty(true);
        tile.updateTransform();
        this._tiles[z] = gid;

        return tile;
    }