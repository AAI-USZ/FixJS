function (tmxString, resourcePath) {
    var ret = new cc.TMXTiledMap();
    if (ret.initWithTMXFile(tmxString, resourcePath)) {
        return ret;
    }
    return null;
}