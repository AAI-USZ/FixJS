function (followedNode, rect) {
    var ret = new cc.Follow();
    if (rect != null && ret && ret.initWithTarget(followedNode, rect)) {
        return ret;
    }
    else if (ret && ret.initWithTarget(followedNode)) {
        return ret;
    }
    return null;
}