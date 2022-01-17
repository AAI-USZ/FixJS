function (fileName) {
        return this.initWithTexture(cc.TextureCache.sharedTextureCache().addImage(fileName));
    }