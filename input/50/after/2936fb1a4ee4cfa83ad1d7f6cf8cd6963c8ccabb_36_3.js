function () {
    if (cc.s_sharedAnimationCache == null) {
        cc.s_sharedAnimationCache = new cc.AnimationCache();
        cc.s_sharedAnimationCache.init();
    }
    return cc.s_sharedAnimationCache;
}