function (gid, pos) {
        var rect = this._tileSet.rectForGID(gid);
        rect = cc.RectMake(rect.origin.x / this._contentScaleFactor, rect.origin.y / this._contentScaleFactor,
            rect.size.width / this._contentScaleFactor, rect.size.height / this._contentScaleFactor);
        var z = pos.x + pos.y * this._layerSize.width;

        this._setNodeDirtyForCache();
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());
        this._reusedTile = new cc.Sprite();
        this._reusedTile.initWithBatchNode(this, rect);

        this._reusedTile.setPositionInPixels(this.positionAt(pos));
        this._reusedTile.setVertexZ(this._vertexZForPos(pos));
        this._reusedTile.setAnchorPoint(cc.PointZero());
        this._reusedTile.setOpacity(this._opacity);

        // get atlas index
        var indexForZ = this._atlasIndexForExistantZ(z);
        this._reusedTile.setAtlasIndex(indexForZ);
        this._reusedTile.setDirty(true);
        this._reusedTile.updateTransform();
        this._tiles[z] = gid;

        return this._reusedTile;
    }