function (pos) {
        cc.Assert(pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y >= 0, "TMXLayer: invalid position");
        cc.Assert(this._tiles && this._atlasIndexArray, "TMXLayer: the tiles map has been released");

        var tile = null;
        var gid = this.tileGIDAt(pos);

        // if GID == 0, then no tile is present
        if (gid) {
            var z = pos.x + pos.y * this._layerSize.width;

            tile = this.getChildByTag(z);

            // tile not created yet. create it
            if (!tile) {
                var rect = this._tileSet.rectForGID(gid);
                rect = cc.RECT_PIXELS_TO_POINTS(rect);

                tile = new cc.Sprite();
                tile.initWithTexture(this.getTexture(), rect);
                tile.setBatchNode(this);
                tile.setPosition(this.positionAt(pos));
                tile.setVertexZ(this._vertexZForPos(pos));
                tile.setAnchorPoint(cc.PointZero());
                tile.setOpacity(this._opacity);

                var indexForZ = this._atlasIndexForExistantZ(z);
                this.addSpriteWithoutQuad(tile, indexForZ, z);
            }
        }
        return tile;
    }