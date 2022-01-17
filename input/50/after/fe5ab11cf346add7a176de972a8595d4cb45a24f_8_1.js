function (tmxFile, resourcePath) {
    var ret = new cc.TMXTiledMap();
    if (ret.initWithTMXFile(tmxFile,resourcePath)) {
        return ret;
    }
    return null;
}