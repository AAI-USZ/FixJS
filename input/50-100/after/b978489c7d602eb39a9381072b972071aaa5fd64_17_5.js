function (value, charMapFile, itemWidth, itemHeight, startCharMap, target, selector) {
    var ret = new cc.MenuItemAtlasFont();
    ret.initWithString(value, charMapFile, itemWidth, itemHeight, startCharMap, target, selector);
    return ret;
}