function (tmxFile, resourcePath) {
    var ret = new cc.TMXMapInfo();
    if (ret.initWithTMXFile(tmxFile,resourcePath)) {
        return ret;
    }
    return null;
}