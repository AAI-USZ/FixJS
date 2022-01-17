function (tilesetInfo, layerInfo, mapInfo) {
        // XXX: is 35% a good estimate ?
        var size = layerInfo._layerSize;
        var totalNumberOfTiles = parseInt(size.width * size.height);
        var capacity = totalNumberOfTiles * 0.35 + 1; // 35 percent is occupied ?

        var texture = null;
        if (tilesetInfo) {
            texture = cc.TextureCache.sharedTextureCache().addImage(tilesetInfo.sourceImage.toString());
        }
        if (this.initWithTexture(texture, capacity)) {
            // layerInfo
            this._layerName = layerInfo.name;
            this._layerSize = layerInfo._layerSize;
            this._tiles = layerInfo._tiles;
            this._minGID = layerInfo._minGID;
            this._maxGID = layerInfo._maxGID;
            this._opacity = layerInfo._opacity;
            this._properties = layerInfo.getProperties();
            this._contentScaleFactor = cc.Director.sharedDirector().getContentScaleFactor();

            // tilesetInfo
            this._tileSet = tilesetInfo;

            // mapInfo
            this._mapTileSize = mapInfo.getTileSize();
            this._layerOrientation = mapInfo.getOrientation();

            // offset (after layer orientation is set);
            var offset = this._calculateLayerOffset(layerInfo.offset);
            this.setPosition(offset);

            this._atlasIndexArray = [];

            this.setContentSizeInPixels(cc.SizeMake(this._layerSize.width * this._mapTileSize.width,
                this._layerSize.height * this._mapTileSize.height));
            this._mapTileSize.width /= this._contentScaleFactor;
            this._mapTileSize.height /= this._contentScaleFactor;

            this._useAutomaticVertexZ = false;
            this._vertexZvalue = 0;
            this._alphaFuncValue = 0;
            return true;
        }
        return false;
    }