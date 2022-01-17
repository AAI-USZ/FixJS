function () {
    if (!cc.sharedSpriteFrameCache) {
        cc.sharedSpriteFrameCache = new cc.SpriteFrameCache();
    }
    return cc.sharedSpriteFrameCache;
}