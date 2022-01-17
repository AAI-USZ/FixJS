function (gid, pos, flags) {
        cc.Assert(pos.x < this._layerSize.width && pos.y < this._layerSize.height && pos.x >= 0 && pos.y >= 0, "TMXLayer: invalid position");
        cc.Assert(this._tiles && this._atlasIndexArray, "TMXLayer: the tiles map has been released");
        cc.Assert(gid !== 0 || !(gid >= this._tileSet.firstGid), "TMXLayer: invalid gid:" + gid);

        this._setNodeDirtyForCache();

        var currentFlags = this.tileFlagAt(pos);
        var currentGID = this.tileGIDAt(pos);

        if (currentGID != gid || currentFlags != flags) {
            var gidAndFlags = (gid | flags)>>>0;
            // setting gid=0 is equal to remove the tile
            if (gid == 0) {
                this.removeTileAt(pos);
            }

            // empty tile. create a new one
            else if (currentGID == 0) {
                this._insertTileForGID(gidAndFlags, pos);
            }

            // modifying an existing tile with a non-empty tile
            else {
                var z = pos.x + pos.y * this._layerSize.width;
                var sprite = this.getChildByTag(z);

                if (sprite) {
                    var rect = this._tileSet.rectForGID(gid);
                    rect = cc.RECT_PIXELS_TO_POINTS(rect);

                    sprite.setTextureRect(rect, false, rect.size);
                    if (flags) {
                        this._setupTileSprite(sprite, pos, gidAndFlags);
                    }
                    this._tiles[z] = gidAndFlags;
                }
                else {
                    this._updateTileForGID(gidAndFlags, pos);
                }
            }
        }
    }