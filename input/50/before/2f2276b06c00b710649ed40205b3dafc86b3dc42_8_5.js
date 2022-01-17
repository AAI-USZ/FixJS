function () {
        this._super();
        cc.SpriteFrameCache.sharedSpriteFrameCache().removeUnusedSpriteFrames();
    }