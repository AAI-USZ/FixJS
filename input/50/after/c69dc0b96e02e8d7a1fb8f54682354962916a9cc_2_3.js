function () {
    if (!cc.s_sharedSpriteFrameCache) {
        cc.s_sharedSpriteFrameCache = new cc.SpriteFrameCache();
    }
    return cc.s_sharedSpriteFrameCache;
}