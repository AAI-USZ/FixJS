function () {
        this._super();
        var resources = "res/TileMaps";        // partial paths are OK as resource paths.
        var file = resources + "/orthogonal-test1.tmx";

        var str = cc.FileUtils.getInstance().fullPathFromRelativePath(file);
        cc.Assert(str != null, "Unable to open file");

        var map = cc.TMXTiledMap.create(str, resources);
        this.addChild(map, 0, TAG_TILE_MAP);

        var s = map.getContentSize();
        cc.log("ContentSize:" + s.width + "," + s.height);

        var action = cc.ScaleBy.create(2, 0.5);
        map.runAction(action);
    }