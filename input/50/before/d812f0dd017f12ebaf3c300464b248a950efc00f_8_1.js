function (tmxFile) {
    var ret = new cc.TMXTiledMap();
    if (ret.initWithTMXFile(tmxFile)) {
        return ret;
    }
    return null;
}