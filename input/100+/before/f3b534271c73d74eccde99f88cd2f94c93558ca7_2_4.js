function (gid, pos) {
        cc.Assert(pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y >= 0, "TMXLayer: invalid position");
        cc.Assert(this._tiles && this._atlasIndexArray, "TMXLayer: the tiles map has been released");
        cc.Assert(gid !== 0 || !(gid >= this._tileSet.firstGid), "TMXLayer: invalid gid:" + gid);

        this._setNodeDirtyForCache();
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        var currentGID = this.tileGIDAt(pos);

        if (currentGID != gid) {
            // setting gid=0 is equal to remove the tile
            if (gid == 0) {
                this.removeTileAt(pos);
            }

            // empty tile. create a new one
            else if (currentGID == 0) {
                this._insertTileForGID(gid, pos);
            }

            // modifying an existing tile with a non-empty tile
            else {
                var z = pos.x + pos.y * this._layerSize.width;
                var sprite = this.getChildByTag(z);
                if (sprite) {
                    var rect = this._tileSet.rectForGID(gid);
                    rect = cc.RectMake(rect.origin.x / this._contentScaleFactor, rect.origin.y / this._contentScaleFactor, rect.size.width / this._contentScaleFactor, rect.size.height / this._contentScaleFactor);
                    sprite.setTextureRectInPixels(rect, false, rect.size);
                    this._tiles[z] = gid;
                }
                else {
                    this._updateTileForGID(gid, pos);
                }
            }
        }
    }