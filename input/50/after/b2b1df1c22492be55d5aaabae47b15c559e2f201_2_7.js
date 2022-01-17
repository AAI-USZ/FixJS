function (x) {
    var ret = new cc.FlipX();
    if (ret.initWithFlipX(x))
        return ret;
    return null;
}