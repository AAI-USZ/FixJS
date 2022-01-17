function (tmxFile) {
        cc.Assert(tmxFile != null && tmxFile.length > 0, "TMXTiledMap: tmx file should not be nil");
        this.setContentSize(cc.SizeZero());
        var mapInfo = cc.TMXMapInfo.create(tmxFile);
        if (!mapInfo) {
            return false;
        }
        cc.Assert(mapInfo.getTilesets().length != 0, "TMXTiledMap: Map not found. Please check the filename.");
        this.buildWithMapInfo(mapInfo);
        return true;
    }