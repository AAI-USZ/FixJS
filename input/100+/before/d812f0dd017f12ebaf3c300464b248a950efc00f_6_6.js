function (gid, pos) {
        var rect = this._tileSet.rectForGID(gid);
        rect = cc.RectMake(rect.origin.x / this._contentScaleFactor, rect.origin.y / this._contentScaleFactor,
            rect.size.width / this._contentScaleFactor, rect.size.height / this._contentScaleFactor);
        this._setNodeDirtyForCache();
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        var z = pos.x + pos.y * this._layerSize.width;
        this._reusedTile = new cc.Sprite();
        this._reusedTile.setParent(this);
        this._reusedTile.initWithBatchNode(this, rect);
        this._reusedTile.setPosition(this.positionAt(pos));
        this._reusedTile.setVertexZ(this._vertexZForPos(pos));
        this._reusedTile.setAnchorPoint(cc.PointZero());
        this._reusedTile.setOpacity(this._opacity);
        this._reusedTile.setTag(z);
        // optimization:
        // The difference between _appendTileForGID and _insertTileForGID is that append is faster, since
        // it appends the tile at the end of the texture atlas
        //todo fix
        var indexForZ = this._atlasIndexArray.length;

        // don't add it using the "standard" way.
        this.addQuadFromSprite(this._reusedTile, indexForZ);

        // append should be after addQuadFromSprite since it modifies the quantity values
        this._atlasIndexArray = cc.ArrayAppendObjectToIndex(this._atlasIndexArray, z, indexForZ);
        return this._reusedTile;
    }