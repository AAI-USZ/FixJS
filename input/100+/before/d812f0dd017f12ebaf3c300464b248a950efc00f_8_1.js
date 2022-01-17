function (tmxFile) {
        cc.Assert(tmxFile != null && tmxFile.length > 0, "TMXTiledMap: tmx file should not be nil");

        this.setContentSize(cc.SizeZero());

        var mapInfo = cc.TMXMapInfo.create(tmxFile);

        if (!mapInfo) {
            return false;
        }
        cc.Assert(mapInfo.getTilesets().length != 0, "TMXTiledMap: Map not found. Please check the filename.");

        this._mapSize = mapInfo.getMapSize();
        this._tileSize = mapInfo.getTileSize();
        this._mapOrientation = mapInfo.getOrientation();
        this.setObjectGroups(mapInfo.getObjectGroups());
        this.setProperties(mapInfo.getProperties());
        this._tileProperties = mapInfo.getTileProperties();

        var idx = 0;

        var layers = mapInfo.getLayers();
        if (layers) {
            this._TMXLayers = new Object();

            var layerInfo = null;
            for (var i = 0, len = layers.length; i < len; i++) {
                layerInfo = layers[i];
                if (layerInfo && layerInfo.visible) {
                    var child = this._parseLayer(layerInfo, mapInfo);
                    this.addChild(child, idx, idx);
                    //todo add layer
                    // record the cc.TMXLayer object by it's name
                    var layerName = child.getLayerName();
                    this._TMXLayers[layerName] = child;

                    // update content size with the max size
                    var childSize = child.getContentSize();
                    var currentSize = this.getContentSize();
                    currentSize.width = Math.max(currentSize.width, childSize.width);
                    currentSize.height = Math.max(currentSize.height, childSize.height);
                    this.setContentSize(currentSize);

                    idx++;
                }
            }
        }
        return true;
    }