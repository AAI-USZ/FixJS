function (action, rate) {
    var ret = new cc.Speed();
    if (ret && ret.initWithAction(action, rate)) {
        return ret;
    }
    return null;
}