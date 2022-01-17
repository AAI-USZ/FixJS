function () {
        // Optimization: quick hack that sets the image size on the tileset
        var textureCache = this._textureAtlas.getTexture();
        this._tileSet.imageSize = new cc.Size(textureCache.width, textureCache.height);

        // By default all the tiles are aliased
        // pros:
        //  - easier to render
        // cons:
        //  - difficult to scale / rotate / etc.
        //this._textureAtlas.getTexture().setAliasTexParameters();

        // Parse cocos2d properties
        this._parseInternalProperties();
        this._setNodeDirtyForCache();
        //this._addDirtyRegionToDirector(this.boundingBoxToWorld());

        for (var y = 0; y < this._layerSize.height; y++) {
            for (var x = 0; x < this._layerSize.width; x++) {
                var pos = x + this._layerSize.width * y;
                var gid = this._tiles[pos];

                // XXX: gid == 0 -. empty tile
                if (gid != 0) {
                    this._appendTileForGID(gid, cc.ccp(x, y));
                    // Optimization: update min and max GID rendered by the layer
                    this._minGID = Math.min(gid, this._minGID);
                    this._maxGID = Math.max(gid, this._maxGID);
                }
            }
        }

        cc.Assert(this._maxGID >= this._tileSet.firstGid &&
            this._minGID >= this._tileSet.firstGid, "TMX: Only 1 tilset per layer is supported");
    }