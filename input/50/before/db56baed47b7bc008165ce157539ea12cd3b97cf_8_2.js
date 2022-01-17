function () {
        cc.LabelBMFont.purgeCachedData();
        cc.TextureCache.sharedTextureCache().removeUnusedTextures();
    }