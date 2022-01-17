function (value, charMapFile, itemWidth, itemHeight, startCharMap, target, selector) {
    var ret = new cc.MenuItemAtlasFont();
    ret.initFromString(value, charMapFile, itemWidth, itemHeight, startCharMap, target, selector);
    return ret;
}