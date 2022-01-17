function () {
    if (cc.sharedAnimationCache == null) {
        cc.sharedAnimationCache = new cc.AnimationCache();
        cc.sharedAnimationCache.init();
    }
    return cc.sharedAnimationCache;
}