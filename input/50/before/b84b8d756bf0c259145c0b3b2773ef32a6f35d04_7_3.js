function (tmxFile) {
    var ret = new cc.TMXMapInfo();
    if (ret.initWithTMXFile(tmxFile)) {
        return ret;
    }
    return null;
}