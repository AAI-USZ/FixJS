function (action, speed) {
    var ret = new cc.Speed();
    if (ret && ret.initWithAction(action, speed)) {
        return ret;
    }
    return null;
}