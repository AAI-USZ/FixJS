function () {
    var ret = new cc.Layer();
    if (ret && ret.init()) {
        return ret;
    }
    else {
        return null;
    }
}